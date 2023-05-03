declare namespace NodeJS {
  interface ProcessEnv {
    AWS_REGION: string;
    DATA_TABLE: string;
    JWT_SECRET: string;
    JWT_ACCESS_TOKEN_TTL: string;
    JWT_REFRESH_TOKEN_TTL: string;
  }
}
