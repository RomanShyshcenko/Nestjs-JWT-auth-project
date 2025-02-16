import {HttpException, Injectable, HttpStatus} from '@nestjs/common';
import {Role} from "./roles.model";
import {CreateRoleDTO} from "./dto/create-roles.dto";
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class RolesService {

    constructor(@InjectModel(Role) private rolesRepository: typeof Role) {}

    async creteRole(dto: CreateRoleDTO): Promise<Role> {
        if (await this.rolesRepository.findOne({where: {value: dto.value}})){
            throw new HttpException("Role already exists", HttpStatus.BAD_REQUEST);
        }
        return await this.rolesRepository.create(dto);
    }

    async getRoleByValue(value: string): Promise<Role> {
        return await this.rolesRepository.findOne({where: {value}})
    }
}
