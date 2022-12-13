import { ApiProperty, IntersectionType, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class AgentDto {
  @ApiProperty()
  @Expose()
  @Type(() => String)
  _id: string;

  @ApiProperty()
  @Expose()
  secret: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty()
  @Expose()
  @Type(() => Date)
  updatedAt: Date;
}

export class CreateAgentDto extends OmitType(AgentDto, [
  '_id',
  'secret',
  'createdAt',
  'updatedAt',
]) {}

export class UpdateAgentDto extends IntersectionType(
  PickType(AgentDto, ['_id']),
  PartialType(CreateAgentDto),
) {}

export class AgentListItemDto extends AgentDto {}
