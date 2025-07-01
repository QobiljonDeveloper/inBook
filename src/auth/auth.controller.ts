import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { SigninUserDto } from "../users/dto/sign-in.dto";
import { Request, Response } from "express";
import { CookieGetter } from "../common/decorators/cookie-getter.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  signup(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(200)
  @Post("signin")
  signin(
    @Body() dto: SigninUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signin(dto, res);
  }
  @Get("signout")
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.signout(req, res);
  }

  @Post("signout2")
  signout(@CookieGetter("refreshToken") token: string, @Res() res: Response) {
    return this.authService.signout2(token, res);
  }
  @HttpCode(200)
  @Post(":id/refresh")
  refresh(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshToken(id, refreshToken, res);
  }

  @Get("activate/:link")
  async activate(@Param("link") link: string) {
    return await this.authService.activate(link);
  }
}
