import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, ObjectId, Types } from 'mongoose';
import { WifiClient } from 'src/wifi-clients/wifi-clients.entity';

export type ClientRestrictionDocument = HydratedDocument<ClientRestriction>;

@Schema({ id: true, timestamps: { createdAt: true, updatedAt: true } })
export class ClientRestriction extends Document {
  @Prop({ unique: true, type: Types.ObjectId, ref: WifiClient.name })
  clientId: ObjectId;

  @Prop()
  active: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ClientRestrictionSchema = SchemaFactory.createForClass(ClientRestriction);
