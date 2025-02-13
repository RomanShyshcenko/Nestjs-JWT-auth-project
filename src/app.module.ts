import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { UserModule } from './user/user.module';
import {ConfigModule} from "@nestjs/config";
import * as process from "node:process";
import {User} from "./user/user.model";
import { RolesService } from './roles/roles.service';
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRoles} from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';

let getNodeEnv = (): string => {
    if (process.env.NODE_ENV){
        return `.${process.env.NODE_ENV}.env`
    }
    return '.env'
}


@Module({
  imports: [
      ConfigModule.forRoot({
        envFilePath: getNodeEnv(),
      }),
    SequelizeModule.forRoot({
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: +process.env.POSTGRES_PORT,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        models: [User, Role, UserRoles],
        autoLoadModels: true,
      }),
      UserModule,
      RolesModule,
      AuthModule,
  ],


})
export class AppModule {}
