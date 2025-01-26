import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy} from 'passport-google-oauth20';
import { AuthService } from "../auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy){

    constructor(@Inject(AuthService) private readonly authService: AuthService){
        super({
            clientID: '585426221116-qfgedk54v7d497d8affhnab4hnpmdpc5.apps.googleusercontent.com', 
            clientSecret: process.env.DATABASE_URI,
            callbackURL: 'http://localhost:3000/api/auth/google/redirect',
            scope: ['profile', 'email']
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile) {
        const user = await this.authService.validateUser({email: profile.emails[0].value, name: profile.displayName,});
        return user || null;
    }
}