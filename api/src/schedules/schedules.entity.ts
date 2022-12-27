import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from "mongoose";
import { Action } from "src/action/actions.entity";

export type ScheduleDocument = HydratedDocument<Schedule>;

@Schema({ id: true, timestamps: true })
export class Schedule extends Document {
  @Prop()
  cron: string;

  @Prop()
  action: Action;

  @Prop()
  active: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
