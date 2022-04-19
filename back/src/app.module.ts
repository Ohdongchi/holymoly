import { Module } from "@nestjs/common";
import { join } from "path";

// module
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { ChatModule } from "./chat/chat.module";

// service
import { AppService } from "./app.service";
import { ConfigService } from "@nestjs/config";

// controller
import { AppController } from "./app.controller";
import { UserModule } from './user/user.module';
import { ModelsModule } from './models/models.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env"],
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "views"),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          name: "waydn",
          type: "mysql",
          host: configService.get<string>("DATABASE_HOST"),
          port: configService.get<number>("DATABASE_PORT"),
          username: configService.get<string>("DATABASE_USER"),
          password: configService.get<string>("DATABASE_PASSWORD"),
          database: configService.get<string>("DATABASE_NAME"),
          entities: ["dist/**/*.entity.js"],
          migrations: ["dist/migration/*.js"],
          cli: {
            // "migrations": "src/migration"
          },
          synchronize: false,
        };
      },
      inject: [ConfigService],
    }),
    ChatModule, // gateway
    UserModule,
    AuthModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
