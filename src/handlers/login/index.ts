import { compareSync } from 'bcryptjs';
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

  const user = await User.get({ email });
  if (!user || !compareSync(password, user.passwordHash)) {
    throw new Error('Invalid email or password');
  }

  const accessToken = generateAccessToken(user.id, email);
  const refreshToken = generateRefreshToken(user.id, email);

  return httpResponse({
    id: user.id,
    accessToken,
    refreshToken,
  });
});

main.use(requestValidator({ bodySchema }));
