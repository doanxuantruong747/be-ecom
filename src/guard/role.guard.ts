import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/config/role';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const roles = this.reflector.get<Array<string>>(
        'roles',
        context.getHandler(),
      );

      if (!roles || roles[0] === Role.ALL) return true;

      const request = context.switchToHttp().getRequest();
      const bearerToken = request?.headers?.authorization;
      const role = request.headers?.pg_role;

      if (!bearerToken) {
        return false;
      }
      const token = bearerToken.slice(7);
      if (!token || !token.length) {
        return false;
      }

      let user = this.jwtService.verify(token);

      if (role === Role.SUPER_USER) {
        // user = await this.superUserService.getSingle(user.email);
        request.user = user;
        return user;
      }
      if (user) return true;
      if (!user) return false;

      // return roles.includes(user?.role) || roles.includes(Role.ALL);
    } catch (error) {
      console.log(error);

      return false;
    }
  }
}
