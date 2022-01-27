import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Request } from '@nestjs/common';
import { PaginationDateDto } from 'src/common/dtos/pagination-date.dto';
import { IUserSession } from 'src/user/interfaces/user-session.interface';
import { CreateIncomeDto } from '../dtos/create-income.dto';
import { UpdateIncomeDto } from '../dtos/update-income.dto';
import { IncomesService } from './incomes.service';

@Controller('transactions/incomes')
export class IncomesController {

    constructor(
        private readonly incomeService: IncomesService,) {
    }

    @Get()
    async findAll(@Request() req, @Query() pagination: PaginationDateDto) {

        const user:IUserSession = req.user;

        return this.incomeService.findAll(user, pagination);
    }

    @Get(":id")
    async findOne(@Param('id') id: string, @Request() req) {

        const user:IUserSession = req.user;
        const incomeType = await this.incomeService.findOne(+id, user);
        

        if(!incomeType) {
            throw new NotFoundException("Id not found");
        }

        return incomeType;
    }

    @Post()
    create(@Body() createIncomeDto: CreateIncomeDto, @Request() req) {
        const user:IUserSession = req.user;
        //console.log("incomeeee",createIncomeDto);
        return this.incomeService.create(createIncomeDto, user);
    }

    @Patch(':id')
    update(@Param('id') id: string,@Body() updateIncomeDto: UpdateIncomeDto, @Request() req) {
        const user:IUserSession = req.user;

        return this.incomeService.update(+id, updateIncomeDto, user);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
        const user:IUserSession = req.user;
        return this.incomeService.remove(+id, user);
    }

}
