import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDTO} from "./dto/create-roles.dto";
import {Role} from "./roles.model";
import {ApiOperation, ApiTags} from "@nestjs/swagger";

@ApiTags("Roles")
@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) {}

    @ApiOperation({summary: "Create role"})
    @Post()
    create(@Body() createRoleDto: CreateRoleDTO): Promise<Role> {
        return this.roleService.creteRole(createRoleDto)
    }

    @ApiOperation({summary: "Get role"})
    @Get('/:value')
    getByValue(@Param('value') value: string): Promise<Role> {
        return this.roleService.getRoleByValue(value)
    }
}
