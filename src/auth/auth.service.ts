import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user/user.service';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from 'src/user/dtos/user-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const validPassword = await bcrypt.compare(pass,user.password)

    if (validPassword === true) {
        const { password, ...result } = user;
        return result;
    }

    return null;
  }

  async login(loginDto: UserLoginDto) {
        const user = await this.usersService.findOne(loginDto.user);

        if(!user) {
            throw new NotFoundException("User name not found");
        }

        const validPassword = await bcrypt.compare(loginDto.password,user.password)

        if (validPassword !== true) {
            throw new NotFoundException("User or password incorrect");
        }

        const {user_name, id, name} = user;
        const payload = { user_name: user.user_name, id: user.id, name: name };
        return {
            access_token: this.jwtService.sign(payload),
            user_name, 
            id, 
            name
        };
    }
    
}

