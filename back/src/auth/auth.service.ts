import { HttpException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import {
  Connection,
  getConnection,
  getManager,
  TransactionManager,
} from "typeorm";
import * as bcrypt from "bcrypt";
import { JwtAuthUser, LoginPayloadDto, RegisterPayloadDto } from "../Dto/auth.dto";
import { User } from "./../models/User.entity";
import { JwtService } from "@nestjs/jwt/dist/jwt.service";
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) { }

  async validateUser(email: string): Promise<any> {
    const conn = getConnection("waydn");
    User.useConnection(conn);
    const user = await User.createQueryBuilder("user")
      .where("user.email = :email", { email: email })
      .getOne();

    if (!user) {
      throw new UnauthorizedException("사용자를 찾을 수 없습니다.");
    }
    console.log("validate", user);
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

    const passCompare = await bcrypt.compare(payload.password, user.password);


    if (!user) {
      throw new NotFoundException("찾을 수 없는 사용자입니다.");
    }

    const data: JwtAuthUser = {
      userId: user.id,
      email: user.email,
      nickname: user.nickname,
      birthDay: user.birthDay,
      image: user.profileImage,
    }

    return {
      access_token: this.jwtService.sign(data),
    }
  }
}
