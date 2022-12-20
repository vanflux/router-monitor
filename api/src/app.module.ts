import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { AgentsModule } from './agents/agents.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { WifiClientsModule } from './wifi-clients/wifi-clients.module';
import { ClientRestrictionModule } from './client-restriction/client-restriction.module';

@Module({
  imports: [AuthModule, DatabaseModule, ConfigModule.forRoot({ load: [configuration] }), AgentsModule, WifiClientsModule, ClientRestrictionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
