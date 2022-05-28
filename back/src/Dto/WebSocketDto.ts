import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsDecimal, IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRoomDto {
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
  @IsArray()
  hashTag: Array<string>;
}

export class DeleteRoomDto {
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  roomId: number;
}

export class JoinRoomDto {
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  roomId: number;
}

export class SendToServerDto {
  @ApiProperty()
  @IsDefined()
  message: any

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  roomId: number;
  
} 