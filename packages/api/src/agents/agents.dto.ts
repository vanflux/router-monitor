import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class AgentDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  secret: string;

  @ApiProperty()
  @Expose()
  routerType: string;

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
  'id',
  'secret',
  'routerType',
  'createdAt',
  'updatedAt',
]) {}

export class AgentListItemDto extends AgentDto {}
