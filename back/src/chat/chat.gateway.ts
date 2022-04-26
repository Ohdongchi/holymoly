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
import { WebSocketCreateRoomDto } from "src/Dto/WebSocketDto";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { ChatService } from "./chat.service";
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

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage("createChatRoom")
  async createChatRoom(client: Socket, @MessageBody() payload: any, @Request() req: any): Promise<any> {
    this.chatService.createChatRoom(client, payload, req);
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage("deleteChatRoom")
  async deleteChatRoom(client: Socket, @MessageBody() payload: any, @Request() req: any): Promise<any> {
    this.chatService.deleteChatRoom(client, payload, req);
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage("getAllChatRoomList")
  async getAllChatRoomList(client: Socket, @MessageBody() payload: any, @Request() req: any): Promise<any> {
    this.chatService.getAllChatRoomList(client, req);
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage("message")
  async handleMessage(@MessageBody() data: any, @Request() req: any, client: Socket) {
    // this.chatService.createChatRoom(client, data, req); 
    console.log(data);
  }

  // front back 둘다 emit으로 날리면 on으로 받는다
  afterInit(server: Server) {
    console.log("Websocket Init");
  }
  // Server = 서버 데이터 Socket = 클라이언트 데이터
  // 연결됐을 때

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log(`connected websocket`);
    console.log(client.data);

    client.emit("hello", client.nsp.name);
  }
  // 연결 종료됐을 때
  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.logger.log(`client disconnected: ${client.id}`);
    client.nsp.emit("onLineList", "");
  }
}
