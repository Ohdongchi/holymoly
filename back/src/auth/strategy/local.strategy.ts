import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { compare } from "bcrypt";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: "email",
      passwordField: "password",
      passwordReqToCallback: false,
    });
  }

  async validate(email: string, password: string) {
    console.log(email);
    return await this.authService.validateUser(email);
  };
}
