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
import { RoomHashTag } from "./Neutrality/RoomHashTag.entity";

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

    @DeleteDateColumn()
    deletedAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: "host" })
    user: User;

    @OneToMany(() => RoomHashTag, roomHashTag => roomHashTag.room)
    hashTag: RoomHashTag[];

    static fundById(id: number) {
        return this.createQueryBuilder("Room")
            .where("user.id = :id", { id })
            .getOne();
    }
}
