import { applyDecorators } from "@nestjs/common";
import { SetMetadata } from "@nestjs/common/decorators";
import { ApiBearerAuth } from "@nestjs/swagger";

export const Authorized = (...types: ('agent' | 'admin')[]) => applyDecorators(
  ApiBearerAuth(),
  SetMetadata('authorized_types', types),
);
