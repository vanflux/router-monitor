import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsDefined, IsNotEmptyObject, IsObject, ValidateNested } from "class-validator";
import { Document, HydratedDocument } from "mongoose";

export class ActionData {}

export class LogActionData extends ActionData {
  @Expose()
  type: 'log';

  @Expose()
  message: string;
}

export class ClientRestrictionActiveActionData extends ActionData {
  @Expose()
  type: 'client-restriction:active';

  @Expose()
  clientId: string;

  @Expose()
  active: boolean;
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

export class Action<ActionData=any> {
  @Expose()
  @ApiProperty({ example: { type: 'log', message: 'Hello world!' }})
  @ValidateNested()
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
	@Type(() => ActionData, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: 'type',
      subTypes: [
        { value: LogActionData, name: 'log' },
        { value: ClientRestrictionActiveActionData, name: 'client-restriction:active' },
      ],
    },
  })
  data: ActionData;
}

export type ActionLogDocument = HydratedDocument<ActionLog>;

@Schema({ id: true, timestamps: { createdAt: true, updatedAt: false } })
export class ActionLog extends Document {
  @Prop()
  message: string;

  @Prop()
  createdAt: Date;
}

export const ActionLogSchema = SchemaFactory.createForClass(ActionLog);

