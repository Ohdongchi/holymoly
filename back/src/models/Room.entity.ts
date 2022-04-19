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
} from "typeorm";
import { ChatLog } from "./ChatLog.entity";

import { User } from "./User.entity";
@Entity({ name: "Room" })
export class Room extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: "30",
    })
    roomName: string;

    @Column({
        type: "bigint",
    })
    host: number;

    @Column({
        type: "int"
    })
    personel: number;


    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({name: "host"})
    user: User;

    static fundById(id: number) {
        return this.createQueryBuilder("Room")
            .where("user.id = :id", { id })
            .getOne();
    }
}
