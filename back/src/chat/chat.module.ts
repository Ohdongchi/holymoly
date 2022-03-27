import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ChatGateway } from "./chat.gateway";
@Module({
  providers: [ChatGateway],
  exports: [ChatGateway]
})
export class ChatModule {}
