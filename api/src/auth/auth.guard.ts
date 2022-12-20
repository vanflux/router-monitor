import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuards implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) {}
  
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    
    const authorizedTypes = this.reflector.get('authorized_types', context.getHandler());
    if (!authorizedTypes?.length) return true;
    
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith('Bearer ')) {
      const token = authorization.substring('Bearer '.length);
      if (token) {
        const authToken = this.authService.decodeToken(token);
        if (authToken) {
          req.token = token;
          req.authToken = authToken;
        }
      }
    }

    if (
      (authorizedTypes.includes('agent') && req.authToken?.agent) ||
      (authorizedTypes.includes('admin') && req.authToken?.admin)
    ) return true;

    throw new UnauthorizedException();
  }
}
