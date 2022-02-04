import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserSession } from 'src/user/interfaces/user-session.interface';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {

    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository:Repository<Category>) {

    }

    async findAll(user: IUserSession) {
        return this.categoryRepository.find({
            where: {
                active: true
            }
        })
    }

    async findOne(id: number, user: IUserSession) {
        const category = await this.categoryRepository.findOne(id, {
            where: {
                user_creates: user.id
            }
        });

        if(!category) {
            throw new NotFoundException("Id not found");
        }

        return category;
    }

    async create(createCategoryDto: CreateCategoryDto, user: IUserSession) {

        const category = this.categoryRepository.create({
            ...createCategoryDto,
            user_creates: user.id,
            creation_date: new Date()
        });

        return this.categoryRepository.save(category);
    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto, user: IUserSession) {
        const { active, description} = updateCategoryDto;

        console.log(updateCategoryDto);

        const incomeType = await this.categoryRepository.preload({
            id: id,
            ...updateCategoryDto,
            user_modifies: user.id,
            modification_date: new Date()
        });

        if(!incomeType){
            throw new NotFoundException(`Income Type #${id} not found`);
        }

        return this.categoryRepository.save(incomeType);
    }

    async remove(id: number, user: IUserSession) {
        const category = await this.findOne(id, user);

        // const categoryAlreadyHasData = await this.categoryRepository.findOne({
        //     where: {
        //         income_type: incomeType 
        //     }
        // });

        // if(incomeAlreadyHasData){
        //     throw new NotFoundException(`Income Type ${incomeType.description} can't be delete`);
        // }

        return this.categoryRepository.remove(category);
    }

}
