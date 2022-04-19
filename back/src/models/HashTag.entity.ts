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

@Entity({name: "HashTag"})
export class HashTag extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type:"varchar",
        length: "30",
    })
    hashTag: string;
}