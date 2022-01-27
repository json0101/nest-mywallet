import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UserLoginDto {
    @ApiProperty({description: "User name usually an email"})
    @IsString()
    readonly user: string;

    @ApiProperty({description: "User password"})
    @IsString()
    readonly password: string;
}
