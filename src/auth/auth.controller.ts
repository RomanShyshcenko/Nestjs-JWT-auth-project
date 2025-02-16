import {Body, Controller, Post} from '@nestjs/common';
import {CreateUserDTO} from "../user/dto/create-user.dto";
import {AuthService} from "./auth.service";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {User} from "../user/user.model";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({summary: "Log in with email and password"})
    @ApiResponse({status: 200, type: User,description: 'Successfully logged in'})
    @Post('/login')
    login(@Body() userDTO: CreateUserDTO) {
        return this.authService.login(userDTO);
    }

    @ApiOperation({summary: "Create new user"})
    @ApiResponse({status: 201, type: User,description: 'Successfully created user'})
    @Post('/register')
    registration(@Body() userDTO: CreateUserDTO) {
        return this.authService.registration(userDTO);
    }
}
