import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/database/prisma.service';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const article_id = Number(request.params.id);

    console.log('user: ', user);
    console.log('article_id: ', article_id);
    console.log('requiredRoles: ', requiredRoles);

    const moderators = await this.prismaService.moderator.findMany({
      where: {
        article_id,
      },
    });
    console.log('moderators', moderators);

    if (requiredRoles.includes(Role.Moderator)) {
      return moderators.some(({ id }) => id === user.id);
    }
  }
}
