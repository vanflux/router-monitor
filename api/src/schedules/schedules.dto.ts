import { ApiProperty, IntersectionType, OmitType, PartialType, PickType } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { Action } from "src/action/actions.entity";
import { ValidateCron } from "./schedules.decorator";

export class ScheduleDto {
  @ApiProperty()
  @Expose()
  @Type(() => String)
  _id: string;

  @ApiProperty({ example: '* * * * * *' })
  @ValidateCron()
  @Expose()
  cron: string;

  @Expose()
  @ValidateNested()
  @ApiProperty({ type: Action })
  action: Action;

  @ApiProperty({ example: true })
  @Expose()
  enabled: boolean;

  @ApiProperty()
  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty()
  @Expose()
  @Type(() => Date)
  updatedAt: Date;
}

export class CreateScheduleDto extends OmitType(ScheduleDto, [
  '_id',
  'createdAt',
  'updatedAt',
]) {}

export class UpdateScheduleDto extends IntersectionType(
  PickType(ScheduleDto, ['_id']),
  PartialType(CreateScheduleDto),
) {}
