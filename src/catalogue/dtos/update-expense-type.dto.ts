import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";
import { CreateExpenseTypeDto } from "./create-expense-type.dto";

export class UpdateExpenseTypeDto extends PartialType(CreateExpenseTypeDto) {

    @ApiProperty({description: "Income Active"})
    @IsBoolean()
    readonly active: boolean;
}
