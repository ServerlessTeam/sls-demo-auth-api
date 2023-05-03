import middy from '@middy/core';
import doNotWaitForEmptyEventLoop from '@middy/do-not-wait-for-empty-event-loop';
import type {
  APIGatewayAuthorizerResult,
  APIGatewayTokenAuthorizerEvent,
} from 'aws-lambda';

import { authorize } from '@/services/authorizer.service';

export const main = middy(
  async (
    event: APIGatewayTokenAuthorizerEvent
  ): Promise<APIGatewayAuthorizerResult> => {
    return authorize(event.authorizationToken);
  }
);

main.use(doNotWaitForEmptyEventLoop());
