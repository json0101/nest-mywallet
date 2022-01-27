import { Controller, Get, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { Public } from './common/decorators/public.decorator';
import { UserLoginDto } from './user/dtos/user-login.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService
    ,private authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Post('auth/login')
  async login(@Body() user: UserLoginDto) {
    return this.authService.login(user);
  }

 
}
