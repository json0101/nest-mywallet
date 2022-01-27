import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

export class UpdateExpenseDto {
    @ApiProperty({description: "Expense Active"})
    @IsBoolean()
    readonly active: boolean;
}
