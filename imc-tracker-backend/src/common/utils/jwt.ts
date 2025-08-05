import jwt, { SignOptions } from "jsonwebtoken";
import { JWT_SECRET } from "../constants";
import { DecodedTokenPayload } from "../interfaces/jwt.interface";

export function generateToken(
  payload: object,
  expiresIn: SignOptions["expiresIn"] = "1d"
) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}
export function isTokenValid(token: string): boolean {
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export function decodeToken(token: string): DecodedTokenPayload | null {
  const decoded = jwt.decode(token);
  if (
    typeof decoded === "object" &&
    decoded !== null &&
    "id" in decoded &&
    "perfil" in decoded
  ) {
    return decoded as DecodedTokenPayload;
  }
  return null;
}
