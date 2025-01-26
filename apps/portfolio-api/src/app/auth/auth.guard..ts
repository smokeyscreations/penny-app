/* eslint-disable @typescript-eslint/no-unused-vars */
import {Injectable, CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(private jwtService: JwtService){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const request = context.switchToHttp().getRequest();
        const token = request.cookies['jwt'];
        console.log(token);
        
        if(!token){
            throw new UnauthorizedException();
        }
        try{
            request.user = this.jwtService.verify(token);
            console.log(request.user);
        } catch (error){
            console.log(error);
            throw new UnauthorizedException();
        }
        return true;
    }
}