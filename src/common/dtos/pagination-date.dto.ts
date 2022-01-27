import { Type } from "class-transformer";
import { IsDate } from "class-validator";

export class PaginationDateDto {

  @Type(() => Date)
  @IsDate()
  from: Date;

  @Type(() => Date)
  @IsDate()
  until: Date;

}
