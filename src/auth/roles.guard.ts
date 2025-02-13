import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {ROLES_KEY} from "./roles-auth.decorator";
import {Reflector} from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private JwtService: JwtService,
        private reflector: Reflector
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ])

            if (!requiredRoles) return true

            const authHeader = request.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const accessToken = authHeader.split(' ')[1];

            if (!accessToken || bearer !== 'Bearer') {
                throw new UnauthorizedException('Unauthorized');
            }

            const user = this.JwtService.verify(accessToken);

            return user.roles.some(role => requiredRoles.includes(role.value));
        } catch (e) {
            throw new UnauthorizedException({message: "Unauthorized", error: e});
        }
    }
}
