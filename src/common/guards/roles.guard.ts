import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Lấy danh sách các vai trò yêu cầu từ metadata
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    // Nếu không yêu cầu vai trò cụ thể, cho phép truy cập
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // Lấy thông tin user từ request
    const { user } = context.switchToHttp().getRequest();

    // Kiểm tra nếu người dùng không có thông tin role trong payload
    if (!user?.roles || user.roles.length === 0) {
      throw new UnauthorizedException('User does not have any roles assigned.');
    }

    // Kiểm tra xem người dùng có ít nhất một vai trò yêu cầu không
    const hasRole = user.roles.some((userRole: string) =>
      requiredRoles.includes(userRole),
    );

    if (!hasRole) {
      throw new UnauthorizedException('User does not have the required roles.');
    }

    return hasRole;
  }
}
