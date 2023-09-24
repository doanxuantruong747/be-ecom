import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Role } from "src/config/role";
import { AuthService } from "src/modules/auth/auth.service";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService, private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const roles = this.reflector.get<Array<string>>("roles", context.getHandler());

      if (!roles || roles[0] === Role.ALL) return true;

      const request = context.switchToHttp().getRequest();
      const bearerToken = request?.headers?.Authorization;

      if (!bearerToken) {
        return false;
      }
      const token = bearerToken.slice(7);
      if (!token || !token.length) {
        return false;
      }

      let user = this.jwtService.verify(token);

      if (user) {
        user = await this.authService.getSingleUser(user.email);
        if (user.role === Role.CLIENT_USER || user.role === Role.SUPER_USER) {
          request.user = user;
          return true;
        }
      }
      if (!user) return false;

      return roles.includes(user?.role) || roles.includes(Role.ALL);
    } catch (error) {
      console.log(error);

      return false;
    }
  }
}
