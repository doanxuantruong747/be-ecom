import { Role } from "./../../config/role";
import { Injectable } from "@nestjs/common";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { CreateUser } from "src/types/User";
import { User } from "../users/entities/user.entity";
import { checkHashPassword, hashPassword, retunException } from "src/utils/helper";
import { ERROR_MAP } from "src/constants/error";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  //resgister User
  async resgister(body: CreateUser) {
    const { userName, email, password } = body;
    const user = await User.findOne({ where: { email: email } });

    if (user) {
      return retunException(400, ERROR_MAP["AE001"]);
    }
    const newUser = new User();
    newUser.userName = userName;
    newUser.email = email;
    newUser.password = await hashPassword(password);
    await newUser.save();
    return { message: "Create user successfully" };
  }

  // get single user
  async getSingleUser(body: CreateUser) {
    const { email } = body;
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return retunException(400, ERROR_MAP["AE002"]);
    }
    return { user };
  }

  // get single user
  async Login(body: CreateUser) {
    const { email, password } = body;
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return retunException(400, ERROR_MAP["AE002"]);
    }
    const isValidPassword = await checkHashPassword(password, user.password);
    if (isValidPassword === false) {
      return { message: "Invalid username or password" };
    }

    const payload = { id: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      acsset_token: token
    };
  }
}
