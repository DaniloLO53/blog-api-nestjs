import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('isPublic: ', isPublic);
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    // console.log('request: ', request);
    const retorno = super.canActivate(context);

    console.log('retorno do jwt: ', retorno);

    return super.canActivate(context);
  }
}
//
