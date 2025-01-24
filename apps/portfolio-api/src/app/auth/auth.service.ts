import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService){}

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

}