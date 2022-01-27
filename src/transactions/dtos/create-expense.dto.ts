import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDecimal, IsIn, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateExpenseDto {

    @ApiProperty({description: "Expense type"})
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    readonly expense_type: number;

    @ApiProperty({description: "Expense value"})
    @IsNotEmpty()
    @IsPositive()
    readonly value: number;

    @ApiProperty({description: "Expense date"})
    @IsNotEmpty()
    readonly date: Date;

    @ApiProperty({description: "Expense observations"})
    @IsString()
    @IsOptional()
    readonly observations: string;
    
}
