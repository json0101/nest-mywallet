import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateIncomeTypeDto {

    @ApiProperty({description: "Type of Income Description"})
    @IsString()
    @IsNotEmpty()
    readonly description: string;

}
