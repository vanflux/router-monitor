import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientRestrictionController } from './client-restriction.controller';
import { ClientRestriction, ClientRestrictionSchema } from './client-restriction.entity';
import { ClientRestrictionService } from './client-restriction.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ClientRestriction.name, schema: ClientRestrictionSchema },
    ])
  ],
  controllers: [ClientRestrictionController],
  providers: [ClientRestrictionService],
  exports: [ClientRestrictionService],
})
export class ClientRestrictionModule {}
