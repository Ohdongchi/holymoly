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
import { Header, Headers, Logger, Req, Request, UseGuards } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import { CreateRoomDto, DeleteRoomDto, JoinRoomDto, SendToServerMessageDto } from "src/Dto/ChatDto";
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


  // http api 로 돌려야함 ----
  @UseGuards(JwtAuthGuard)
  @SubscribeMessage("createChatRoom")
  async createChatRoom(@ConnectedSocket() client: Socket, @MessageBody() payload: CreateRoomDto, @Request() req: any): Promise<any> {
    // console.log(payload);
    return await this.chatService.createChatRoom(client, payload, req, this.server);
  }

  // @UseGuards(JwtAuthGuard)
  // @SubscribeMessage("deleteChatRoom")
  // async deleteChatRoom(@ConnectedSocket() client: Socket, @MessageBody() payload: DeleteRoomDto, @Request() req: any): Promise<any> {
  //   this.server.socketsLeave
  //   return await this.chatService.deleteChatRoom(client, payload, req, this.server);
  // }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage("joinChatRoom")
  joinChatRoom(@ConnectedSocket() client: Socket, @MessageBody() payload: JoinRoomDto, @Request() req: any): Promise<any> {
    // console.log(payload);
    return this.chatService.joinChatRoom(client, payload, req, this.server);
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage("sendToServerRoomList")
  async getAllChatRoomList(@ConnectedSocket() client: Socket, @Request() req: any): Promise<any> {

    return await this.chatService.getAllChatRoomList(client, req);
  }
  // ----

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage("getChatLog")
  async getChatLog(@ConnectedSocket() client: Socket, @MessageBody() payload: any, @Request() req: any) {
    return await this.chatService.getChatLog(client, payload, req, this.server);
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage("sendToServerMessage")
  async sendToServerMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: SendToServerMessageDto, @Request() req: any) {

    return await this.chatService.sendToServerMessage(client, payload, req, this.server);
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage("exitChatRoom")
  async exitChatRoom(@ConnectedSocket() client: Socket, @Request() req: any, @MessageBody() payload: any) {
    console.log("exit room");
    return await this.chatService.exitChatRoom(client, payload, req, this.server)
  }

  // front back 둘다 emit으로 날리면 on으로 받는다
  afterInit(server: Server) {
    console.log("Websocket Init");
  }
  // Server = 서버 데이터 Socket = 클라이언트 데이터
  // 연결됐을 때

  handleConnection(@ConnectedSocket() client: Socket) {
    // joinChatRoom을 여기다가 쓰면 좋을텐데.. 그러면 미세한 컨트롤이 불가할 수 도 있다..
    console.log(`connected websocket ${new Date()}`);
  }
  // 연결 종료됐을 때
  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.logger.log(`client disconnected: ${client.id}`);
  }
}
