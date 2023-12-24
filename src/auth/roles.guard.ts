import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

//Decorator
import { ROLES_KEY } from './decorator/auth.decorator';

//Enum
import { Role } from './enum/auth.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    //Constructor
    constructor(
        private reflector: Reflector
    ) { }

    //Can activate
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getNext();
        return requiredRoles.some((role) => user.role?.includes(role));
    }
}