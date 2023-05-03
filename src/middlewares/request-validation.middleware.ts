import type middy from '@middy/core';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ZodBoolean, ZodObject, ZodRecord } from 'zod';

type MiddlewareOptions = {
  bodySchema:
    | ZodObject<Record<string, any>>
    | ZodRecord
    | ZodBoolean
    | undefined;
};

const defaults = {
  bodySchema: undefined,
};

export const requestValidator = (
  opts: MiddlewareOptions = defaults
): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const before: middy.MiddlewareFn<
    APIGatewayProxyEvent,
    APIGatewayProxyResult
  > = async (request): Promise<void> => {
    if (opts.bodySchema) {
      const validationResult = opts.bodySchema.safeParse(request.event.body);

      if (validationResult.success === false) {
        console.error(
          'Request validation failed',
          validationResult.error.issues
        );

        throw new Error('Invalid request');
      }
    }
  };

  return { before };
};
