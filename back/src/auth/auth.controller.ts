import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  UseGuards,
  Request,
  Body,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginPayloadDto, RegisterPayloadDto } from "../Dto/auth.dto";
// import { LocalAuthGuard } from "./guard/local-auth.guard";
import { AuthGuard } from "@nestjs/passport";
import * as bcrypt from "bcrypt";
import { LocalAuthGuard, } from "./guard/local-auth.guard";
import { JwtAuthGuard } from "./guard/jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) { }


  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async Login(
    @Request() req: any,
    @Body() payload: LoginPayloadDto
  ): Promise<any> {
    return await this.authService.Login(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Post("test")
  async test(@Request() req: any): Promise<any> {
    console.log(req.user);
    return {message: "ok"};
  }


  @Post("/register")
  async Register(
    @Request() req: any,
    @Body() payload: RegisterPayloadDto
  ): Promise<any> {
    return await this.authService.Register(payload);
  }
}
