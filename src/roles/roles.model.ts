import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../user/user.model";
import {UserRoles} from "./user-roles.model";

interface UserCreationAttrs {
    value: string;
    description: string;
}

@Table({tableName: "role"})
export class Role extends Model<Role, UserCreationAttrs> {
    @ApiProperty({example: 1, description: "ID of the user"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: "ADMIN", description: "Value of the role"})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string

    @ApiProperty({example: "Admin", description: "Description of the role"})
    @Column({type: DataType.STRING, allowNull: false})
    description: string

    @BelongsToMany(() => User, () => UserRoles)
    users: User[];
}