import type {
  APIGatewayProxyEventBase,
  APIGatewayProxyResult,
  Callback,
  Context,
} from 'aws-lambda';

export interface AuthorizerContext {
  authType: 'google' | 'microsoft';
  email: string;
  serviceAccount: boolean;
  principalId: string;
}

export interface BodyParams<T = unknown> {
  body: T;
}

export interface QueryParams<T = Record<string, unknown>> {
  queryStringParameters: T;
}

export interface PathParams<T = Record<string, unknown>> {
  pathParameters: T;
}

export type EventParams = Partial<BodyParams> &
  Partial<QueryParams> &
  Partial<PathParams>;

export type Handler<P extends EventParams> = (
  event: Omit<
    APIGatewayProxyEventBase<AuthorizerContext>,
    'body' | 'pathParameters' | 'queryStringParameters'
  > & {
    body: P extends BodyParams<infer TBody> ? TBody : null;
    pathParameters: P extends PathParams<infer TParams> ? TParams : null;
    queryStringParameters: P extends QueryParams<infer TParams>
      ? TParams
      : null;
  },
  context: Context,
  callback: Callback<APIGatewayProxyResult>
) => void | Promise<APIGatewayProxyResult>;
