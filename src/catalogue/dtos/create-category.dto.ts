import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {

    @ApiProperty({description: "Category Description"})
    @IsString()
    @IsNotEmpty()
    readonly description: string;
    
}