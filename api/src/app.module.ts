import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { AgentsModule } from './agents/agents.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { WifiClientsModule } from './wifi-clients/wifi-clients.module';
import { ClientRestrictionModule } from './client-restriction/client-restriction.module';
import { ActionsModule } from './action/actions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    AuthModule,
    DatabaseModule,
    AgentsModule,
    WifiClientsModule,
    ClientRestrictionModule,
    ActionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
