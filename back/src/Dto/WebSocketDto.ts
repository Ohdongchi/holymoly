import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDecimal, IsDefined, IsOptional, IsString } from "class-validator";

export class WebSocketCreateRoomDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  roomName: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  personel: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  hashTag: string;
}

export class WebsocketDeleteRoomDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  roomName: string;S
}