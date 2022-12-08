import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminLoginRequestDto, AgentLoginRequestDto, AuthResponseDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/admin')
  @HttpCode(HttpStatus.OK)
  async loginAdmin(@Body() { username, password }: AdminLoginRequestDto): Promise<AuthResponseDto> {
    return this.authService.loginAdmin(username, password);
  }

  @Post('login/agent')
  @HttpCode(HttpStatus.OK)
  async loginAgent(@Body() { id, secret }: AgentLoginRequestDto): Promise<AuthResponseDto> {
    return this.authService.loginAgent(id, secret);
  }
}
