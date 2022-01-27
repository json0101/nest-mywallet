import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDecimal, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateIncomeDto {

    @ApiProperty({description: "Income Type"})
    @IsInt()
    @IsNotEmpty()
    @IsPositive()
    readonly income_type: number;

    @ApiProperty({description: "Income value"})
    @IsNotEmpty()
    @IsPositive()
    readonly value: number;

    @ApiProperty({description: "Income date"})
    @IsNotEmpty()
    readonly date: Date;

    @ApiProperty({description: "Income observations"})
    @IsString()
    @IsOptional()
    readonly observations: string;
    
}
