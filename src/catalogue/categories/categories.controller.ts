import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Request } from '@nestjs/common';
import { IUserSession } from 'src/user/interfaces/user-session.interface';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {


    constructor(private readonly categoryService: CategoriesService) {

    }

    @Get()
    async findAll(@Request() req) {
        const user: IUserSession = req.user;

        return this.categoryService.findAll(user);
    }

    @Get(":id")
    async findOne(@Param('id') id: string, @Request() req) {
        const user:IUserSession = req.user;
        const category = await this.categoryService.findOne(+id, user);

        if(!category) {
            throw new NotFoundException("Id not found");
        }

        return category;
    }

    @Post()
    create(@Body() categoryDto: CreateCategoryDto, @Request() req) {
        const user:IUserSession = req.user;
        return this.categoryService.create(categoryDto, user);
    }

    @Patch(':id')
    update(@Param('id') id: string,@Body() updateIncomeTypeDto: UpdateCategoryDto, @Request() req) {
        const user:IUserSession = req.user;

        return this.categoryService.update(+id, updateIncomeTypeDto, user);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
        const user:IUserSession = req.user;

        return this.categoryService.remove(+id, user);
    }
}
