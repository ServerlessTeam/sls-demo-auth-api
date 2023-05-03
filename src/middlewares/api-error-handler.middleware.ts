import type middy from '@middy/core';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { httpError } from '@/common/http/response';

export const apiErrorHandler = (): middy.MiddlewareObj<
  APIGatewayProxyEvent,
  APIGatewayProxyResult
> => {
  const onError: middy.MiddlewareFn<
    APIGatewayProxyEvent,
    APIGatewayProxyResult
  > = async (request): Promise<APIGatewayProxyResult> => {
    if (request.error) {
      console.error('Error', request.error);

      return httpError(request.error);
    }

    return httpError(new Error('Internal server error'));
  };

  return { onError };
};
