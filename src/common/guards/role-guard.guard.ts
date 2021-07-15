import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

let isok = true
@Injectable()
export class RoleGuardGuard implements CanActivate {
  constructor(private readonly reflector: Reflector){}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const permission = this.reflector.get('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();

    console.info(permission, request.params, request.query, request.user);
    return isok;
  }
}
