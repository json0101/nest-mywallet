import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";
import { CreateIncomeTypeDto } from "./create-income-type.dto";

export class UpdateIncomeTypeDto extends PartialType(CreateIncomeTypeDto){

    @ApiProperty({description: "Income Active"})
    @IsBoolean()
    readonly active: boolean;

}
