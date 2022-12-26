import { ApiProperty, IntersectionType, OmitType, PartialType, PickType } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsBoolean, isBoolean, IsDate, IsDefined, IsString, ValidateNested } from "class-validator";
import { Action } from "src/action/actions.entity";
import { ValidateCron } from "./schedules.decorator";

export class ScheduleDto {
  @ApiProperty()
  @Expose()
  @Type(() => String)
  @IsString()
  _id: string;

  @ApiProperty({ example: '* * * * *' })
  @ValidateCron()
  @Expose()
  @IsString()
  cron: string;

  @Expose()
  @ValidateNested()
  @IsDefined()
  @ApiProperty({ type: Action })
  action: Action;

  @ApiProperty({ example: true })
  @Expose()
  @IsBoolean()
  active: boolean;

  @ApiProperty()
  @Expose()
  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty()
  @Expose()
  @IsDate()
  @Type(() => Date)
  updatedAt: Date;
}

export class CreateScheduleDto extends OmitType(ScheduleDto, [
  '_id',
  'createdAt',
  'updatedAt',
]) {}

export class UpdateScheduleDto extends IntersectionType(
  PickType(ScheduleDto, ['_id'] as const),
  PartialType(CreateScheduleDto),
) {}
