import {Body, HttpException, HttpStatus, Injectable, Post, UnauthorizedException} from '@nestjs/common';
import {CreateUserDTO} from "../user/dto/create-user.dto";
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcryptjs"
import {User} from "../user/user.model";

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private JWTService: JwtService
    ) {}

    async login(userDTO: CreateUserDTO) {
        const user = await this.validateUser(userDTO);
        return this.generateToken(user)
    }

    async registration(userDTO: CreateUserDTO) {
        const candidate = await this.userService.getUserByEmail(userDTO.email);
        if (candidate) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDTO.password, 5);
        const user = await this.userService.CreateUser({...userDTO, password: hashPassword});

        return this.generateToken(user);
    }

    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles};
        return {
            token: this.JWTService.sign(payload),
        }
    }

    private async validateUser(dto: CreateUserDTO) {
        const user = await this.userService.getUserByEmail(dto.email);
        const passwordEquals = await bcrypt.compare(dto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: 'Invalid Credentials'});
    }

}
