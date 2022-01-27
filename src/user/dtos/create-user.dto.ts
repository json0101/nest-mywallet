import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({description: "User name alwayls an email"})
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    readonly user_name: string;

    @ApiProperty({description: "User password"})
    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @ApiProperty({description: "Name, person's name"})
    @IsString()
    @IsNotEmpty()
    readonly name: string;
}
