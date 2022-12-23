import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
import { ValidateAction } from "./actions.decorator";
import { BaseAction } from "./actions.entity";

export class ActionDto {
  @Expose()
  @ApiProperty({ type: BaseAction, example: { type: 'log', message: 'Hello world!' }})
  @ValidateAction()
  action: BaseAction;
}
