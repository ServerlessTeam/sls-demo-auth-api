import { sign, verify } from 'jsonwebtoken';

const { JWT_SECRET, JWT_ACCESS_TOKEN_TTL, JWT_REFRESH_TOKEN_TTL } = process.env;

export function generateAccessToken(id: string, email: string): string {
  return sign({ id, email }, JWT_SECRET, {
    expiresIn: parseInt(JWT_ACCESS_TOKEN_TTL, 10),
  });
}

export function generateRefreshToken(id: string, email: string): string {
  return sign({ id, email }, JWT_SECRET, {
    expiresIn: parseInt(JWT_REFRESH_TOKEN_TTL, 10),
  });
}

export function verifyToken(token: string) {
  try {
    const claims = verify(token, JWT_SECRET, {
      complete: false,
    });

    if (typeof claims === 'string') {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}
