import { applyDecorators } from "@nestjs/common";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { BaseAction, LogAction } from "./actions.entity";

export const ValidateAction = () => applyDecorators(
	ValidateNested(),
	Type(() => BaseAction, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: 'type',
      subTypes: [
        { value: LogAction, name: 'log' },
      ],
    },
  })
);
