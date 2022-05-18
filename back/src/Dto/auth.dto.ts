import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsString,
  IsNumber,
  IsEnum,
  IsEmail,
  IsDefined,
  IsDate,
  IsOptional,
} from "class-validator";
import * as dayjs from "dayjs";


export class RegisterPayloadDto {
  @ApiProperty({
    type: "string",
  })
  @IsDefined()
  @IsString()
  email: string;

  @ApiProperty({
    type: "string",
  })
  @IsDefined()
  @IsString()
  password: string;

  @ApiProperty({
    type: "string",
    default:"알수없음"
  })
  @IsDefined()
  @IsString()
  nickname: string;

  @ApiPropertyOptional({
    type: "date",
    default: dayjs().date()
  })
  @IsOptional()
  @IsDate()
  birthDay: Date;

  @ApiPropertyOptional({
    type: "string",
    default: "https://via.placeholder.com/50"
  })
  @IsOptional()
  @IsString()
  profileImg: string;

}

export class LoginPayloadDto {
  @ApiProperty({
    type: "string",
    // pattern: "/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/"
    // 더 알아보기
  })
  @IsDefined()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: "string",
  })
  @IsDefined()
  @IsString()
  password: string;
}

export class JwtAuthUser {
  @ApiProperty()
  @IsNumber()
  @IsDefined()
  id: number;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  nickname: string;

  @ApiProperty()
  @IsDate()
  birthDay: Date;

  @ApiProperty()
  @IsString()
  image: string;

}