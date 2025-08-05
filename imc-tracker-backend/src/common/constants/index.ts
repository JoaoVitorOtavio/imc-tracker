export const JWT_SECRET = process.env.JWT_SECRET ?? "segredo-muito-forte";

export const ACCESS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";

export const ACCESS_TOKEN_EXPIRES_IN =
  process.env.ACCESS_TOKEN_EXPIRES_IN ?? "15m";
export const REFRESH_TOKEN_EXPIRES_IN =
  process.env.REFRESH_TOKEN_EXPIRES_IN ?? "7d";
