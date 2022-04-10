import { ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
    canActivate(context: ExecutionContext) {
        // Add your custom authentication logic here
        // for example, call super.logIn(request) to establish a session.
        return super.canActivate(context);
    }

    handleRequest<TUser = any>(err: any, user: any, info: any, context: any, status?: any): TUser {
        console.log(user);
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
}