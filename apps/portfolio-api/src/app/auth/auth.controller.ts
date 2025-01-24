import { BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './utils/Guards';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/schemas/user.schema';
import {JwtService} from "@nestjs/jwt";
import {Response, Request} from 'express';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService, private jwtService: JwtService) {}

  @Post('signup')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {

    const existingUser = await this.authService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Invalid credentials.');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser: User = {
      name,
      email,
      password: hashedPassword,
    };
    const user = await this.authService.createUser(newUser);

    return user;  
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({passthrough: true}) response: Response
  ) {

    const user = await this.authService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const pwMatches = await bcrypt.compare(password, user.password || '');
    if (!pwMatches) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = {
      sub: user._id.toString(),
      email: user.email,
    }
    const jwt = await this.jwtService.signAsync(payload);

    response.cookie('jwt', jwt, {httpOnly: true});

    console.log('Successful login');

    return {
      message: 'success'
    };
  }

  @Get('user')
  async user(@Req() request: Request){
    try{
      
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);

      if(!data){
        throw new UnauthorizedException();
      }

      const userId = data.sub;
      const user = await this.authService.findOne(userId);

      return user;
    }catch(e){
      throw new UnauthorizedException();
    }
    
  }

  @Post('logout')
  async logout(@Res({passthrough: true}) response: Response){
    response.clearCookie('jwt');

    return{
      message: 'success'
    }
  }
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Google Authentication' };
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleRedirect() {
    return {msg: 'OK'};
  }
}

