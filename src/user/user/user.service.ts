import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLoginDto } from '../dtos/user-login.dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
        
    }

    

    async findOne(user: string): Promise<User | undefined>  {
        return this.userRepository.findOne({
            user_name: user
        });
    }

    async create(createUser: CreateUserDto) {
        const userExist = await this.findOne(createUser.user_name);

        if(userExist) {
            throw new NotFoundException("User already exists");
        }
        const { password, ...OthersUserFields} = createUser;
        console.log("Creating",createUser);
        const passwordHash =  await bcrypt.hash(password, 10);

        const user = await this.userRepository.create({
            ...OthersUserFields,
            password: passwordHash,
            active: true,
            user_creates: 1,
            creation_date: new Date()
        });
        this.userRepository.save(user);
        return {
            id: user.id,
            user_name: user.user_name,
            name: user.name,
        };
    }
}
