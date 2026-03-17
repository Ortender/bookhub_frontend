export interface JwtPayload {
  sub: string;
  firstName?: string;
  role?: string[];
  exp?: number;
  iat?: number;
}