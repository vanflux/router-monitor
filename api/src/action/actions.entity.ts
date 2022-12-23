import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Expose } from "class-transformer";
import { Document, HydratedDocument, now } from "mongoose";

export class BaseAction {
  @Expose()
  type: string;
}

export class LogAction extends BaseAction {
  @Expose()
  type: 'log';

  @Expose()
  message: string;
}

export class ActionResult {
  @Expose()
  success: boolean;
  
  @Expose()
  data?: any;

  constructor(success: boolean, data?: any) {
    this.success = success;
    this.data = data;
  }
}

export type ActionLogDocument = HydratedDocument<ActionLog>;

@Schema({ id: true, timestamps: { createdAt: true, updatedAt: false } })
export class ActionLog extends Document {
  @Prop()
  message: string;

  @Prop({ default: now() })
  createdAt: Date;
}

export const ActionLogSchema = SchemaFactory.createForClass(ActionLog);

