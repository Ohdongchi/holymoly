import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class WebSocketDto {
  @ApiProperty()
  @IsString()
  room: string;

  @ApiProperty()
  @IsString()
  msg: string;

  @ApiProperty()
  @IsString()
  nickname: string;
}


export class CreateChatRommDto {
  @ApiProperty()
  @IsString()
  room_name: string;
}