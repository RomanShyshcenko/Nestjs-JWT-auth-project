import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class BanUserDto {
    @ApiProperty({example: '1', description: 'User ID', type: 'number'})
    @IsNumber()
    @IsNotEmpty()
    readonly userId: number;

    @ApiProperty({example: 'Flood in chat', description: 'Reason of ban', type: 'string'})
    @IsString()
    readonly banReason: string;
}