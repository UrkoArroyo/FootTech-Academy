import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const payload = req.user ?? null;
    if (!payload) throw new ForbiddenException('Access denied');

    const id = payload.sub ?? payload.id ?? null;
    if (!id) throw new ForbiddenException('Access denied');

    const user = await this.usersService.findOneById(Number(id));
    if (!user) throw new ForbiddenException('Access denied');

    if (user.role !== 'admin') throw new ForbiddenException('Access denied');

    // optionally attach the full user to request for downstream handlers
    req.currentUser = user;

    return true;
  }
}
