import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader("access_token"),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("JWT_SECRET_KEY"),

    });
  }

  async validate(payload: any) {
    return { userId: payload.userId, email: payload.email };
  }
}

// jwtService.sign(payload) => jwt.Strategy.ts (validate(payload)) 에 들어간다.