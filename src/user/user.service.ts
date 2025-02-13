import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {CreateUserDTO} from "./dto/create-user.dto";
import {User} from "./user.model";
import {InjectModel} from "@nestjs/sequelize";
import {RolesService} from "../roles/roles.service";
import {Role} from "../roles/roles.model";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {where} from "sequelize";
import {UpdateUserDTO} from "./dto/update-user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private roleService: RolesService,
    ) {}

    async CreateUser(dto: CreateUserDTO): Promise<User> {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue('USER');
        await user.$set('roles', [role.id]);
        user.roles = [role];
        return user;
    }

    async updateUser(id: number, dto: UpdateUserDTO): Promise<User> {
        const user = await this.userRepository.findByPk(id)
        const not_unique_email = await this.userRepository.findOne({where: {email: dto.email}});
        if (user && !not_unique_email) {
            await user.update(dto)
            return user
        } else if (!user){
            throw new NotFoundException();
        } else if (not_unique_email){
            throw new HttpException(`User with email ${dto.email} already exists`, HttpStatus.BAD_REQUEST);
        }

        return user
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.findAll({include: {all: true}});
    }

    async getUserByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({where: {email}, include: {all: true}});
    }

    async addRole(dto: AddRoleDto){
        const user = await this.userRepository.findOne({where: {id: dto.userId, banned: false}});
        const role = await this.roleService.getRoleByValue(dto.value);
        if (user && role) {
            await user.$add('role', role.id);
            return dto;
        }
        throw new NotFoundException('User or role does not exist');
    }

    async ban(dto: BanUserDto) {
        const user = await this.userRepository.findOne({where: {id: dto.userId, banned: false}});
        if (user) {
            user.banned = true;
            user.banReason = dto.banReason;
            await user.save();

            return {'message': 'User successfully banned'};
        }
        throw new NotFoundException('User does not exist');
    }
}
