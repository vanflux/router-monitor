import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign, verify } from 'jsonwebtoken';
import { AgentsService } from 'src/agents/agents.service';
import { LoginFailedException } from 'src/exceptions/login-failed.exception';
import { AuthResponseDto } from './auth.dto';
import { AuthToken } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(private agentsService: AgentsService, private configService: ConfigService) {}

  async loginAdmin(username: string, password: string): Promise<AuthResponseDto> {
    if (username !== this.getAdminUsername() || password !== this.getAdminPassword())
      throw new LoginFailedException();
    const token = this.genJwtToken({ admin: { username: this.getAdminUsername() } });
    return { token };
  }

  async loginAgent(id: string, secret: string): Promise<AuthResponseDto> {
    const agent = await this.agentsService.getByIdAndSecret(id, secret);
    const token = this.genJwtToken({ agent: { id: agent.id } });
    return { token };
  }

  decodeToken(token: string): AuthToken | undefined {
    try {
      return verify(token, this.getSecret()) as AuthToken;
    } catch {}
  }

  private genJwtToken(authToken: AuthToken): string {
    return sign(authToken, this.getSecret());
  }

  private getAdminUsername() {
    return this.configService.get('admin.user', { infer: true });
  }

  private getAdminPassword() {
    return this.configService.get('admin.pass', { infer: true });
  }

  private getSecret() {
    return this.configService.get('jwt.secret', { infer: true });
  }
}
