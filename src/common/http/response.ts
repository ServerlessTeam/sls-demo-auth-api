import type { APIGatewayProxyResult } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';

export function httpResponse(
  data: Record<string, unknown> | Array<Record<string, unknown>>,
  statusCode: StatusCodes = StatusCodes.OK
): APIGatewayProxyResult {
  return {
    body: JSON.stringify(data),
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  };
}

export function httpError(error: Error): APIGatewayProxyResult {
  const responseBody: Record<string, unknown> = {
    error: error.message,
  };

  return {
    body: JSON.stringify(responseBody),
    statusCode: StatusCodes.BAD_GATEWAY,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  };
}
