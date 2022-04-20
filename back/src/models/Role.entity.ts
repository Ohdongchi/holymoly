import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    Generated,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
    ManyToMany,
    ManyToOne,
    JoinColumn,
    OneToMany,
    OneToOne,
} from "typeorm";

import { RoleType } from "./RoleType/RoleType";
import { User } from "./User.entity";
import { UserRole } from './Neutrality/UserRole.entity';

@Entity({ name: "Role" })
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
    }) 
    role: string;
    
    @OneToMany(() => UserRole, (userRole) => userRole.role)
    user: UserRole[];
}