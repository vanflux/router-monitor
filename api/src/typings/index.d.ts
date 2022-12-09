import { AuthToken } from 'src/auth/auth.interface';

declare global {
  namespace Express {
    interface Request {
      authToken: AuthToken;
      token: string;
    }
  }
}

export {};
