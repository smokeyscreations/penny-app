import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ResetToken, ResetTokenSchema } from '../users/schemas/reset-token-schema';
import { MailService } from './utils/mail.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, MailService],
  imports: [UsersModule, JwtModule.register({
    global: true,
    secret: 'secret',
    signOptions: { expiresIn: '8h' }
  }),
    MongooseModule.forFeature([{ name: ResetToken.name, schema: ResetTokenSchema }])],

})

export class AuthModule {

 
}
