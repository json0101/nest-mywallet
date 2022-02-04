import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";
import { CreateCategoryDto } from "./create-category.dto";

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {

    @ApiProperty({description: "Category Active: This field doesn't delete the data, but if not active you won't be able to use it"})
    @IsBoolean()
    readonly active: boolean;
}
