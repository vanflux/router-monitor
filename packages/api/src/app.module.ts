import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { AgentsModule } from './agents/agent.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    ConfigModule.forRoot({ load: [configuration] }),
    AgentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
