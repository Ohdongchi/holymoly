import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  UseGuards,
  Body,
  Req,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginPayloadDto, RegisterPayloadDto } from "../Dto/auth.dto";
// import { LocalAuthGuard } from "./guard/local-auth.guard";
import { AuthGuard } from "@nestjs/passport";
import * as bcrypt from "bcrypt";
import { LocalAuthGuard, } from "./guard/local-auth.guard";
import { JwtAuthGuard } from "./guard/jwt-auth.guard";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";

@Controller("auth")
export class AuthController {
  constructor(
    // private jwtService: JwtService,
    private authService: AuthService,

  ) { }

  @Post("/login")
  async Login(
    @Req() req: Request,
    @Body() payload: LoginPayloadDto
  ): Promise<any> {
    return await this.authService.Login(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Post("test")
  async test(@Req() req: Request): Promise<any> {
    
    return { message: "ok" };
  }

  @Post("/register")
  async Register(
    @Req() req: Request,
    @Body() payload: RegisterPayloadDto
  ): Promise<any> {
    return await this.authService.Register(payload);
  }


  // @UseGuards(JwtAuthGuard)
  @Post("/verify")
  async verify(@Req() req: any) {
    console.log("verify");
    return await this.authService.verify(req.headers?.access_token);
  }
}