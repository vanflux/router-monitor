import { Expose, Type } from "class-transformer";
import { IsDate, IsString } from "class-validator";

export class ActionLogDto {
  @Expose()
  @Type(() => String)
  @IsString()
  _id: string;

  @Expose()
  @IsString()
  message: string;
  
  @Expose()
  @IsDate()
  createdAt?: Date;
}
