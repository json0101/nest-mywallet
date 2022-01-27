import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Request } from '@nestjs/common';
import { IUserSession } from 'src/user/interfaces/user-session.interface';
import { CreateExpenseTypeDto } from '../dtos/create-expense-type.dto';
import { UpdateExpenseTypeDto } from '../dtos/update-expense-type.dto';
import { ExpenseTypesService } from './expense-types.service';

@Controller('catalogue/expense-types')
export class ExpenseTypesController {

    constructor(private readonly expenseTypeService : ExpenseTypesService) {

    }

    @Get()
    async findAll(@Request() req) {
        const user:IUserSession = req.user;
        
        return this.expenseTypeService.findAll(user);
        
    }

    @Get(":id")
    findOne(@Param('id') id: string, @Request() req) {
        const user:IUserSession = req.user;
        const incomeType = this.expenseTypeService.findOne(+id,user);

        if(!incomeType) {
            throw new NotFoundException("Id not found");
        }

        return incomeType;
    }

    @Post()
    create(@Body() createExpenseDto: CreateExpenseTypeDto, @Request() req) {
        const user:IUserSession = req.user;

        return this.expenseTypeService.create(createExpenseDto,user);
    }

    @Patch(':id')
    update(@Param('id') id: string,@Body() updateExpenseDto: UpdateExpenseTypeDto, @Request() req) {
        const user:IUserSession = req.user;

        return this.expenseTypeService.update(+id, updateExpenseDto, user);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
        const user:IUserSession = req.user;
        return this.expenseTypeService.remove(+id, user);
    }
}
