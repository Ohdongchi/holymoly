import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./Category.entity";
import { User } from "./User.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Category])],
})
export class ModelsModule {}
