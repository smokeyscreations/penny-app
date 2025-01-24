import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [GoogleStrategy, AuthService],
  imports: [UsersModule, JwtModule.register({
    secret: 'secret',
    signOptions: {expiresIn: '8h'}
  })]
})
export class AuthModule {

 
}
