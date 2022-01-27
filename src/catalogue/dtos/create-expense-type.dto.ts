import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateExpenseTypeDto {

    @ApiProperty({description: "Type of Expense Description"})
    @IsString()
    @IsNotEmpty()
    readonly description: string;
    
}
