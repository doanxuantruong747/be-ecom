import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { CONFIG } from "config";

console.log("CONFIG.JWT_EXPIRE", CONFIG.JWT_EXPIRE);
console.log("CONFIG.JWT_SECRET", CONFIG.JWT_SECRET);
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: CONFIG.JWT_SECRET,
      signOptions: { expiresIn: CONFIG.JWT_EXPIRE }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
