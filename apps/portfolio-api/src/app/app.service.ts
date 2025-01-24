import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { User } from './users/schemas/user.schema';

@Injectable()
export class AppService {
  constructor(private readonly usersService: UsersService){}
 

  async create(user: User): Promise<User>{
    return this.usersService.create(user);
  }

  async findOneByEmail(condition: any): Promise<User>{
    return this.usersService.findOneByEmail(condition);
  }
}
