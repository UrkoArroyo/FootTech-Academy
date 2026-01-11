import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

export const CurrentUser = createParamDecorator(
  async (data: string | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const payload = req.user ?? null;
    if (!payload) return null;
    const id = payload.sub ?? payload.id ?? null;
    if (!id) return null;
    try {
      const nestApp = req?.app?.get ? req.app.get('nestApp') : null;
      if (!nestApp) return null;
      const usersService = (nestApp.get(UsersService) as UsersService) || null;
      if (!usersService) return null;
      const user = await usersService.findOneById(Number(id));
      if (!user) return null;
      const { password, ...rest } = user ?? ({} as any);
      return rest ?? null;
    } catch (err) {
      return null;
    }
  },
);
