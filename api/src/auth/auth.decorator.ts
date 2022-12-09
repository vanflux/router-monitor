import { applyDecorators, ExecutionContext } from "@nestjs/common";
import { createParamDecorator, SetMetadata } from "@nestjs/common/decorators";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Request } from "express";

export const Authorized = (...types: ('agent' | 'admin')[]) => applyDecorators(
  ApiBearerAuth(),
  SetMetadata('authorized_types', types),
);

export const Auth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.authToken;
  },
);
