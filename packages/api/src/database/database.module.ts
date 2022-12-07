import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'mysql',
        host: configService.get('db.host', { infer: true }),
        port: configService.get('db.port', { infer: true }),
        username: configService.get('db.user', { infer: true }),
        password: configService.get('db.pass', { infer: true }),
        database: 'router-monitor',
        autoLoadModels: true,
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
