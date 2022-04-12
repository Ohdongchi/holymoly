import { Injectable, UnauthorizedException, HttpException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard("local") {
    handleRequest<TUser = any>(err: any, user: any, info: any, context: any, status?: any): TUser {
        
        const request = context.switchToHttp().getRequest();
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
} 