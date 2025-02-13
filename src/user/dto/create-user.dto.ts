import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDTO {
    @ApiProperty({example: "test@gmail.com", default: "test@gmail.com", type: "string"})
    @IsEmail()
    readonly email: string;

    @ApiProperty({example: "password123", type: "string"})
    @IsString()
    @Length(5, 16)
    readonly password: string;
}