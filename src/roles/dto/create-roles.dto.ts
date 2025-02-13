import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString, MaxLength} from "class-validator";

export class CreateRoleDTO {
    @ApiProperty({example: "ADMIN", description: "Value of the role"})
    @IsNotEmpty()
    @IsString()
    @MaxLength(155)
    readonly value: string;

    @ApiProperty({example: "Admin with privileges", description: "Description of the role"})
    @IsString()
    readonly description: string;
}