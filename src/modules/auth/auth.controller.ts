import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { CreateUser } from "src/types/User";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // resgister a new user
  @Post("/resgister")
  async resgister(@Req() req: any, @Res() res: any) {
    const body: CreateUser = req.body;
    try {
      const response = await this.authService.resgister(body);
      return res.status(200).json(response);
    } catch (error) {
      console.log("resgister error", error);
    }
  }

  // login
  @Post("/login")
  async Login(@Req() req: any, @Res() res: any) {
    const body: CreateUser = req.body;
    try {
      const response = await this.authService.Login(body);
      return res.status(200).json(response);
    } catch (error) {
      console.log("login error", error);
    }
  }
}
