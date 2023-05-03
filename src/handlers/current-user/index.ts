import { createHandler } from '@/common/http/handlers';
import { httpResponse } from '@/common/http/response';

export const main = createHandler(async (event) => {
  const { principalId, email } = event.requestContext.authorizer;

  return httpResponse({
    id: principalId,
    email,
  });
});
