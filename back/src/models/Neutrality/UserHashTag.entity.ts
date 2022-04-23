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
import { HashTag } from "../HashTag.entity";
import { User } from "../User.entity";

@Entity({ name: "UserHashTag" })
export class UserHashTag extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "int",
    })
    userId: number;

    @Column({
        type: "int"
    })
    hashTagId: number;

    @ManyToOne(() => User, user => user.hashTag)
    @JoinColumn({ name: "userId" })
    user: User;

    @ManyToOne(() => HashTag, hashTag => hashTag.userHashTag)
    @JoinColumn({ name: "hashTagId" })
    hashTag: HashTag;
}
