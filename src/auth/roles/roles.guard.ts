import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../enum/role.enum';
import { Roles_Key } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector:Reflector){}
  canActivate(
    context: ExecutionContext,
  ):boolean {
    const requiredRole = this.reflector.getAllAndOverride<Role[]>(Roles_Key,[
      context.getHandler(),
      context.getClass()
    ])
    if(!requiredRole){
      return true;
    }
    const {user} = context.switchToHttp().getRequest();
    //give .some method takes function as an argument
    
    return requiredRole.some((role)=>user.role?.includes(role))
    
  }
}
