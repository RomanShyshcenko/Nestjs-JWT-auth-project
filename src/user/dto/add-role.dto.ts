import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class AddRoleDto {
    @ApiProperty({example: '1', default: '1', type: 'number'})
    @IsNumber()
    @IsNotEmpty()
    readonly userId: number;

    @ApiProperty({example: 'ADMIN', default: 'USER', type: 'string'})
    @IsString()
    @IsNotEmpty()
    readonly value: string;
}
