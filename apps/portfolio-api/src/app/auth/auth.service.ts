import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { nanoid } from 'nanoid'
import { InjectModel } from '@nestjs/mongoose';
import { ResetToken } from '../users/schemas/reset-token-schema';
import { Model } from 'mongoose';
import { MailService } from './utils/mail.service';
@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService, @InjectModel(ResetToken.name) private resetTokenModel: Model<ResetToken>, private mailService: MailService){}

    async validateUser(details: User){
        console.log('AuthService');
        console.log(details);

        const user = await this.usersService.findOneByEmail(details.email);
        console.log(user);
        if (user) return user;
        console.log('User not found. Creating user')

        const newUser = this.usersService.create(details);

        return newUser;
    }

    async createUser(partialUser: User): Promise<User> {
        return this.usersService.create(partialUser);
      }
    
      async findByEmail(email: string): Promise<User | null> {
        return this.usersService.findOneByEmail(email);
      }

      async findOne(id: string): Promise<User> {
        return this.usersService.findById(id);
      }

      async changePassword(userId: string, oldPassword: string, newPassword: string){
        const user = await this.usersService.findById(userId);

        if(!user){
          throw new NotFoundException('User not found.');
          }

          const passwordMatch = await bcrypt.compare(oldPassword, user.password);
          if(!passwordMatch){
            throw new UnauthorizedException('Wrong credentials');
        }

          const newHashedPassword = await bcrypt.hash(newPassword, 12);

          await this.usersService.update(userId, { password: newHashedPassword });
      }

      async forgotPassword(email: string){
        const user = await this.findByEmail(email);

        if(user){

          console.log(user._id);
          const expiryDate = new Date();
          expiryDate.setHours(expiryDate.getHours() + 1);

          const resetToken = nanoid(64);
          await this.resetTokenModel.create({
            token: resetToken,
            userId: (await user)._id,
            expiryDate
          });

          console.log(email);
          this.mailService.sendPasswordResetEmail(email, resetToken);
        }

        return {"message": "Email sent"};
      }

      async resetPassword(newPassword: string, resetToken: string){
        const token = await this.resetTokenModel.findOneAndDelete({
          token: resetToken,
          expiryDate: {$gte: new Date()},
        });

        if(!token){
          throw new UnauthorizedException('Invalid link');
        }

        const user = await this.usersService.findById(token.userId.toString());
        console.log(token.userId.toString());
        if(!user){
          throw new InternalServerErrorException();
        }

        const newHashedPassword = await bcrypt.hash(newPassword, 12);
        await this.usersService.update(token.userId.toString(), { password: newHashedPassword });
      }
    } 

    

