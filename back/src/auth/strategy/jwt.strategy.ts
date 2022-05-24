import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtAuthUser } from 'src/Dto/auth.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: (req: any) => {
        // req 구조를 보고 access_token이 어딨는지 파악해야함
        // postman: req.handshake.headers.access_token
        // react: req.handshake.auth.access_token
        // http: req.headers.access_token
        if (req.handshake) {
          return req.handshake.auth.access_token ? req.handshake.auth.access_token : req.handshake.headers.access_token
        } else {
          req.headers.access_token
        }

        // return req.handshake ? req.handshake.auth.access_token : req.headers.access_token;
      },
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("JWT_SECRET_KEY"),
    });
  }

  async validate(payload: JwtAuthUser) {
    return payload;
  }
}

// jwtService.sign(payload) => jwt.Strategy.ts (validate(payload)) 에 들어간다.