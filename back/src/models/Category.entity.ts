// Temp

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Generated,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "Category" })
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    default: "group_name",
    length: "30",
  })
  category: string;

  static fundById(id: number) {
    return this.createQueryBuilder("category")
      .where("user.id = :id", { id })
      .getOne();
  }
}
