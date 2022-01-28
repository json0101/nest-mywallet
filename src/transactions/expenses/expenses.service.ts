import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseTypesService } from 'src/catalogue/expense-types/expense-types.service';
import { PaginationDateDto } from 'src/common/dtos/pagination-date.dto';
import { IUserSession } from 'src/user/interfaces/user-session.interface';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateExpenseDto } from '../dtos/create-expense.dto';
import { UpdateExpenseDto } from '../dtos/update-expense.dto';
import { Expense } from '../entities/expense.entity';
import { addDays} from 'date-fns';

@Injectable()
export class ExpensesService {

    constructor(
        @InjectRepository(Expense)
        private readonly expenseRepository: Repository<Expense>,
        private readonly expenseTypesService: ExpenseTypesService)
    {

    }

    dashBoardExpenses(user: IUserSession, paginationDate: PaginationDateDto) {
        const u = addDays(new Date(paginationDate.until), 1);
        return this.expenseRepository.find(
            { 
                relations: ["expense_type"],
                where: {
                    user_creates: user.id,
                    date: Between(paginationDate.from, u),
                    active: true
                    //date: LessThanOrEqual(paginationDate.)
                }
            });
    }

    findAll(user: IUserSession, paginationDate: PaginationDateDto) {
        const u = addDays(new Date(paginationDate.until), 1);
        return this.expenseRepository.find(
            { 
                relations: ["expense_type"],
                where: {
                    user_creates: user.id,
                    date: Between(paginationDate.from, u),
                    //date: LessThanOrEqual(paginationDate.)
                }
            });
    }

    async findOne(id: number, user: IUserSession) {
        const expense = await this.expenseRepository.findOne(id, {
            relations: ["expense_type"],
            where: {
                user_creates: user.id
            }
        });

        if(!expense) {
            throw new NotFoundException("Id not found");
        }

        return expense;
    }

    async create(createExpenseDto: CreateExpenseDto, user: IUserSession) {

        console.log(createExpenseDto);

        const {expense_type, ...othersField} = createExpenseDto;
        const expenseTypeEntity = await this.expenseTypesService.findOne(expense_type,user);

        const expense = await this.expenseRepository.create({
            ...othersField,
            expense_type: expenseTypeEntity,
            user_creates: user.id,
            creation_date: new Date()
        });

        return this.expenseRepository.save(expense);
    }

    async update(id: number, updateExpenseDto: UpdateExpenseDto, user: IUserSession) {

        const expense = await this.expenseRepository.preload({
            id: id,
            ...updateExpenseDto,
            user_modifies: user.id,
            modification_date: new Date()
        });

        if(!expense){
            throw new NotFoundException(`Expense Type #${id} not found`);
        }

        return this.expenseRepository.save(expense);
    }

    async remove(id: number, user: IUserSession){
        const expense = await this.findOne(id, user);
        return this.expenseRepository.remove(expense);
    }
}
