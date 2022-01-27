import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Request } from '@nestjs/common';
import { IUserSession } from 'src/user/interfaces/user-session.interface';
import { CreateIncomeTypeDto } from '../dtos/create-income-type.dto';
import { UpdateIncomeTypeDto } from '../dtos/update-income-type.dto';
import { IncomeTypesService } from './income-types.service';

@Controller('catalogue/income-types')
export class IncomeTypesController {

    constructor(private readonly incomeTypeService: IncomeTypesService) {

    }

    @Get()
    async findAll(@Request() req) {
        const user:IUserSession = req.user;

        return this.incomeTypeService.findAll(user);
    }

    @Get(":id")
    async findOne(@Param('id') id: string, @Request() req) {
        const user:IUserSession = req.user;
        const incomeType = await this.incomeTypeService.findOne(+id, user);

        if(!incomeType) {
            throw new NotFoundException("Id not found");
        }

        return incomeType;
    }

    @Post()
    create(@Body() createIncomeTypeDto: CreateIncomeTypeDto, @Request() req) {
        const user:IUserSession = req.user;
        return this.incomeTypeService.create(createIncomeTypeDto, user);
    }

    @Patch(':id')
    update(@Param('id') id: string,@Body() updateIncomeTypeDto: UpdateIncomeTypeDto, @Request() req) {
        const user:IUserSession = req.user;

        return this.incomeTypeService.update(+id, updateIncomeTypeDto, user);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
        const user:IUserSession = req.user;

        return this.incomeTypeService.remove(+id, user);
    }
}
