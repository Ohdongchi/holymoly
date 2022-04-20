import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    Generated,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
    OneToMany,
    OneToOne,
    ManyToMany,
    ManyToOne,
    JoinColumn,
  } from "typeorm";

import {User} from "../User.entity";
import {Role} from "../Role.entity";


@Entity({name: "UserRole"})
export class UserRole extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        type: "int"
    })
    userId: number;

    @Column({
        type:"int"
    })
    roleId: number;

    @ManyToOne(()=>User, user => user.role)
    @JoinColumn({name:"userId"})
    user: User;

    @ManyToOne(()=>Role, role => role.user)
    @JoinColumn({name:"roleId"})
    role: Role;
}