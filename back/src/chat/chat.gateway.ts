import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Header, Headers, Logger, Request, UseGuards } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import { SendMessageDto, WebSocketCreateRoomDto } from "src/Dto/WebSocketDto";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { ChatService } from "./chat.service";

import * as dayjs from "dayjs";

@WebSocketGateway(3003, {
  namespace: "/chat",
  cors: true,
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    private chatService: ChatService,
  ) { }

  @WebSocketServer() public server: Server;
  private logger: Logger = new Logger(ChatGateway.name);


  // http api 로 돌려야함 ----
  @UseGuards(JwtAuthGuard)
  @SubscribeMessage("createChatRoom")
  async createChatRoom(@ConnectedSocket() client: Socket, @MessageBody() payload: WebSocketCreateRoomDto, @Request() req: any): Promise<any> {
    console.log("client", client);
    return await this.chatService.createChatRoom(client, payload, req);
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage("deleteChatRoom")
  async deleteChatRoom(@ConnectedSocket() client: Socket, @MessageBody() payload: any, @Request() req: any): Promise<any> {
    return await this.chatService.deleteChatRoom(client, payload, req);
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage("getAllChatRoomList")
  async getAllChatRoomList(@ConnectedSocket() client: Socket, @Request() req: any): Promise<any> {
    return await this.chatService.getAllChatRoomList(client, req);
  }
  // ----

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage("sendMessage")
  async sendMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: SendMessageDto, @Request() req: any) {
    console.log("client", client);
    return await this.chatService.sendMessage(client, payload, req);
  }

  // front back 둘다 emit으로 날리면 on으로 받는다
  afterInit(server: Server) {
    console.log("Websocket Init");
  }
  // Server = 서버 데이터 Socket = 클라이언트 데이터
  // 연결됐을 때

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log(`connected websocket ${new Date()}`);
    // console.log(client);
    client.emit("hello", client.nsp.name);
  }
  // 연결 종료됐을 때
  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.logger.log(`client disconnected: ${client.id}`);
  }
}
