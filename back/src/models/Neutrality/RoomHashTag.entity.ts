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

@Entity({name:"RoomHashTag"})
export class RoomHashTag extends BaseEntity {
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
}
