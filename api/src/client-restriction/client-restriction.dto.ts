import { ApiProperty, IntersectionType, OmitType, PartialType, PickType } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";

export class ClientRestrictionDto {
  @ApiProperty()
  @Expose()
  @Type(() => String)
  _id: string;
  
  @ApiProperty()
  @Expose()
  clientId: string;
  
  @ApiProperty()
  @Expose()
  active: boolean;

  @ApiProperty()
  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty()
  @Expose()
  @Type(() => Date)
  updatedAt: Date;
}

export class CreateClientRestrictionDto extends OmitType(ClientRestrictionDto, ['_id', 'createdAt', 'updatedAt']) {}

export class UpdateClientRestrictionDto extends IntersectionType(
  PickType(ClientRestrictionDto, ['_id'] as const),
  PartialType(CreateClientRestrictionDto),
) {}
