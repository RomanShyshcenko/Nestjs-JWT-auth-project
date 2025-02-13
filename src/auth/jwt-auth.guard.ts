import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class JWTAuthGuard implements CanActivate {
    constructor(private readonly JwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        try {
            const authHeader = request.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const accessToken = authHeader.split(' ')[1];
            if (!accessToken || bearer !== 'Bearer') {
                throw new UnauthorizedException('Unauthorized');
            }

            const user = this.JwtService.verify(accessToken);

            request.user = user;
            return true;
        } catch (e) {
            console.log(e);
            throw new UnauthorizedException({message: "Unauthorized"});
        }
    }
}