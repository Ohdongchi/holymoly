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
    JoinTable,
} from "typeorm";
import { RoomHashTag } from "./Neutrality/RoomHashTag.entity";
import { UserHashTag } from "./Neutrality/UserHashTag.entity";

@Entity({name: "HashTag"})
export class HashTag extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type:"varchar",
        length: "30",
        unique:true,
    })
    hashTag: string;

    @OneToMany(()=>UserHashTag, (userHashTag) => userHashTag.hashTag)
    userHashTag: UserHashTag[];

    @OneToMany(()=> RoomHashTag, roomHashTag => roomHashTag.hashTag)
    roomHashTag: RoomHashTag[]
}