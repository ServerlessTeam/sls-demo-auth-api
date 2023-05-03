import { hashSync } from 'bcryptjs';
import { addMinutes } from 'date-fns';
import { nanoid } from 'nanoid';
import { z } from 'zod';

import { createHandler } from '@/common/http/handlers';
import { httpResponse } from '@/common/http/response';
import { BodyParams } from '@/common/http/types';
import { User } from '@/db';
import { requestValidator } from '@/middlewares/request-validation.middleware';
import {
  generateAccessToken,
  generateRefreshToken,
} from '@/services/tokens.service';

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type EventBody = BodyParams<z.infer<typeof bodySchema>>;

export const main = createHandler<EventBody>(async (event) => {
  const { email, password } = event.body;
  const id = nanoid();

  const existingUser = await User.get({ email });
  if (existingUser) {
    throw new Error(`Email ${email} is taken already`);
  }

  await User.create({
    id,
    email,
    passwordHash: hashSync(password),
    deleteAt: Math.floor(addMinutes(new Date(), 5).getTime() / 1000),
  });

  const accessToken = generateAccessToken(id, email);
  const refreshToken = generateRefreshToken(id, email);

  return httpResponse({
    id,
    accessToken,
    refreshToken,
  });
});

main.use(requestValidator({ bodySchema }));
