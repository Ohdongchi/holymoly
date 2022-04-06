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
import { Logger } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import { WebSocketDto } from "src/Dto/WebSocketDto";
@WebSocketGateway(3003, {
  namespace: "/chat",
  cors: true,
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() public server: Server;
  private logger: Logger = new Logger(ChatGateway.name);

  @SubscribeMessage("message")
  handleMessage(@MessageBody() data: any, client: Socket) {
    
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
