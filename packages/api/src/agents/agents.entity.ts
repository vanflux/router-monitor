import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, now, Types } from 'mongoose';

export type AgentDocument = HydratedDocument<Agent>;

@Schema({ id: true, timestamps: true })
export class Agent extends Document {
  @Prop()
  secret: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const AgentSchema = SchemaFactory.createForClass(Agent);
