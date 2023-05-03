import middy from '@middy/core';
import doNotWaitForEmptyEventLoop from '@middy/do-not-wait-for-empty-event-loop';
import cors from '@middy/http-cors';
import httpEventNormalizer from '@middy/http-event-normalizer';
import jsonBodyParser from '@middy/http-json-body-parser';

import { apiErrorHandler } from '@/middlewares/api-error-handler.middleware';

import type { EventParams, Handler } from './types';

export function createHandler<P extends EventParams>(handler: Handler<P>) {
  return middy(handler)
    .use(doNotWaitForEmptyEventLoop())
    .use(jsonBodyParser())
    .use(cors())
    .use(httpEventNormalizer())
    .use(apiErrorHandler());
}
