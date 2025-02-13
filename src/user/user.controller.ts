import {BadRequestException, Body, Controller, Get, Post, Put, Req, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDTO} from "./dto/create-user.dto";
import {User} from "./user.model";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {JWTAuthGuard} from "../auth/jwt-auth.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {Request} from "express";
import {UpdateUserDTO} from "./dto/update-user.dto";

@ApiTags("Users")
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {
    }
    @ApiOperation({summary: "Create new user"})
    @ApiResponse({status: 201, type: User,description: 'Successfully created user'})
    @Post()
    async create(@Body() user: CreateUserDTO): Promise<User> {
        return this.userService.CreateUser(user);
    }

    @ApiOperation({summary: "Update the user"})
    @ApiResponse({status: 200, type: User,description: 'Successfully update the user'})
    @UseGuards(JWTAuthGuard)
    @Put('/update')
    async update(@Req() req: Request, @Body() user: UpdateUserDTO): Promise<User> {
        const userId: number | undefined = req['user']?.id
        if (!userId) {
            throw new BadRequestException('User does not exist')
        }

        return this.userService.updateUser(userId, user);
    }

    @ApiOperation({summary: "Get all users"})
    @ApiResponse({status: 200, type: [User]})
    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll()
    }

    @ApiOperation({summary: "Give role to the user"})
    @ApiResponse({status: 200, type: User})
    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    @Post('/role')
    async giveRole(@Body() dto: AddRoleDto) {
        return this.userService.addRole(dto)
    }

    @ApiOperation({summary: "Ban the user"})
    @ApiResponse({status: 200, type: User})
    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    @Post('/ban')
    async ban(@Body() dto: BanUserDto) {
        return this.userService.ban(dto)
    }
}
