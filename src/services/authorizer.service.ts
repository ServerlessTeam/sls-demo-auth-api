import type {
  APIGatewayAuthorizerResult,
  APIGatewayAuthorizerResultContext,
} from 'aws-lambda';
import { JwtPayload, verify } from 'jsonwebtoken';

import { User } from '@/db';

const { JWT_SECRET } = process.env;

function generatePolicy(
  principalId: string,
  effect: 'Allow' | 'Deny',
  methodArn: string,
  context?: APIGatewayAuthorizerResultContext
): APIGatewayAuthorizerResult {
  return {
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: methodArn,
        },
      ],
    },
    principalId,
    context,
  };
}

export async function authorize(
  originalToken: string
): Promise<APIGatewayAuthorizerResult> {
  if (!originalToken) {
    throw new Error('Unauthorized');
  }

  const [tokenType, tokenValue] = originalToken.split(' ');

  if (!(tokenType.toLowerCase() === 'bearer' && tokenValue)) {
    throw new Error('Unauthorized');
  }

  try {
    const tokenPayload = verify(tokenValue, JWT_SECRET) as JwtPayload;
    const user = await User.get({ email: tokenPayload.email });
    if (!user) {
      throw new Error('Unauthorized');
    }

    return generatePolicy(tokenPayload.id, 'Allow', '*', {
      email: tokenPayload.email,
    });
  } catch (err) {
    console.error('Authorization error:', err);

    throw new Error('Unauthorized');
  }
}
