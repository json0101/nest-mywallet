import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

export class UpdateIncomeDto {
    @ApiProperty({description: "Income Active"})
    @IsBoolean()
    readonly active: boolean;
}
