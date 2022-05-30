import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthService } from "src/auth/auth.service";
import { ChatGateway } from "./chat.gateway";
import { ChatService } from "./chat.service";
@Module({
  // imports: [ApiModule],
  providers: [ChatGateway, ChatService],
  exports: [ChatGateway, ChatService],
})
export class ChatModule {}
