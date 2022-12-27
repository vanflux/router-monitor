import { Expose, Type } from "class-transformer";

export class ActionLogDto {
  @Expose()
  @Type(() => String)
  _id: string;

  @Expose()
  message: string;
  
  @Expose()
  createdAt?: Date;
}
