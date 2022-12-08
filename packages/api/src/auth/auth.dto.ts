import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AdminLoginRequestDto {
  @ApiProperty({ example: 'admin' })
  @Expose()
  username: string;

  @ApiProperty({ example: 'admin' })
  @Expose()
  password: string;
}

export class AgentLoginRequestDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  secret: string;
}

export class AuthResponseDto {
  @ApiProperty()
  @Expose()
  token: string;
}
