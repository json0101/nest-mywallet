import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Request } from '@nestjs/common';
import { PaginationDateDto } from 'src/common/dtos/pagination-date.dto';
import { IUserSession } from 'src/user/interfaces/user-session.interface';
import { CreateExpenseDto } from '../dtos/create-expense.dto';
import { UpdateExpenseDto } from '../dtos/update-expense.dto';
import { ExpensesService } from './expenses.service';

@Controller('transactions/expenses')
export class ExpensesController {

    constructor(private readonly expenseService: ExpensesService) {

    }

    @Get()
    async findAll(@Request() req, @Query() pagination: PaginationDateDto) {
        const user:IUserSession = req.user;
        return this.expenseService.findAll(user, pagination);
    }

    @Get(":id")
    findOne(@Param('id') id: string, @Request() req) {
        const user:IUserSession = req.user;
        const expense = this.expenseService.findOne(+id, user);

        if(!expense) {
            throw new NotFoundException("Id not found");
        }

        return expense;
    }

    @Post()
    create(@Body() createExpenseDto: CreateExpenseDto, @Request() req) {
        const user:IUserSession = req.user;

        console.log(createExpenseDto);

        return this.expenseService.create(createExpenseDto, user);
    }

    @Patch(':id')
    update(@Param('id') id: string,@Body() updateExpenseDto: UpdateExpenseDto, @Request() req) {
        const user:IUserSession = req.user;

        return this.expenseService.update(+id, updateExpenseDto, user);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
        const user:IUserSession = req.user;

        return this.expenseService.remove(+id, user);
    }

}
