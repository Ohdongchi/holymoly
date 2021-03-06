import { BadRequestException, HttpException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import {
  Connection,
  getConnection,
  getManager,
  TransactionManager,
} from "typeorm";
import * as bcrypt from "bcrypt";
import * as dayjs from "dayjs";
import "dayjs/locale/ko";
import * as timezone from "dayjs/plugin/timezone";
import * as utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(timezone);



import { JwtAuthUser, LoginPayloadDto, RegisterPayloadDto } from "../Dto/auth.dto";
import { User } from "./../models/User.entity";
import { JwtService } from "@nestjs/jwt/dist/jwt.service";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }

  async validateUser(email: string): Promise<any> {
    const conn = getConnection("waydn");
    User.useConnection(conn);
    const user = await User.createQueryBuilder("user")
      .where("user.email = :email", { email: email })
      .getOne();

    if (!user) {
      throw new UnauthorizedException("사용자를 찾을 수 없습니다.");
    }
  
    return user;
  }

  async Register(payload: RegisterPayloadDto): Promise<any> {
    const conn = getConnection("waydn");
    User.useConnection(conn);
    
    const user = await User.createQueryBuilder("user")
      .where("user.email = :email", { email: payload.email })
      .getOne();
    
    if (!user) {
      // save
      conn.transaction(async (queryRunnerManager) => {
        const newUser = new User();
        newUser.email = payload.email;
        newUser.password = bcrypt.hashSync(payload.password, 10);
        newUser.nickname = payload.nickname;
        newUser.birthDay = payload.birthDay;
        newUser.profileImage = payload.profileImg;
        await queryRunnerManager.save(newUser);
      });
      return { message: "ok" };
    } else {
      throw new HttpException("이미 존재하는 사용자 입니다.", 401);
    }
  }

  async Login(payload: LoginPayloadDto): Promise<any> {
    const conn = getConnection("waydn");
    User.useConnection(conn);
    const user = await User.createQueryBuilder("user")
      .where("user.email =:email", { email: payload.email })
      .getOne();

    if (!user) {
      throw new NotFoundException("찾을 수 없는 사용자입니다.");
    } else {
      const passCompare = await bcrypt.compare(payload.password, user.password);
      if (!passCompare) {
        throw new BadRequestException("비밀번호가 잘못됐습니다.")
      }
      const data: JwtAuthUser = {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        birthDay: user.birthDay,
        image: user.profileImage,
      }
      const expiresDate = dayjs().tz("Asia/Seoul").add(60, "minute").add(9, "hour"); // utc라 kst 할려면 9시간 추가하고 토큰 시간 60분이라 60분 추가
      
      return {
        access_token: this.jwtService.sign(data),
        expires: expiresDate
      }
    }
  }

  async verify(token: string) {
    const user = await this.jwtService.verify(token);
    if (!user) {
      throw new UnauthorizedException("만료된 토큰");
    } else {
      return {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        birthDay: user.birthDay,
        image: user.image
      };
    }
  }

}
