import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import {Role} from "./roles.model";
import {RolesService} from "./roles.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../user/user.model";

@Module({
    providers: [RolesService],
    exports: [RolesService],
    controllers: [RolesController],
    imports: [
      SequelizeModule.forFeature([Role, User]),
  ]
})
export class RolesModule {}
