import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from 'src/transactions/entities/expense.entity';
import { ExpensesService } from 'src/transactions/expenses/expenses.service';
import { IUserSession } from 'src/user/interfaces/user-session.interface';
import { Repository } from 'typeorm';
import { CreateExpenseTypeDto } from '../dtos/create-expense-type.dto';
import { UpdateExpenseTypeDto } from '../dtos/update-expense-type.dto';
import { ExpenseType } from '../entities/expense-type.entity';

@Injectable()
export class ExpenseTypesService {

    constructor(
        @InjectRepository(ExpenseType)
        private readonly expenseTypeRepository: Repository<ExpenseType>,
        @InjectRepository(Expense)
        private readonly expenseRepository: Repository<Expense>,) {
    }

    findAllActives(user: IUserSession) {
        return this.expenseTypeRepository.find({
            where: {
                user_creates: user.id,
                active: true
            }
        });
    }

    findAll(user: IUserSession) {
        return this.expenseTypeRepository.find({
            where: {
                user_creates: user.id
            }
        });
    }

   
    async findOne(id: number, user: IUserSession) {
        const expenseType = await this.expenseTypeRepository.findOne(id,{
            where: {
                user_creates: user.id
            }
        });

        if(!expenseType) {
            throw new NotFoundException("Id not found");
        }

        return expenseType;
    }


    async create(createTypeExpenseDto: CreateExpenseTypeDto, user: IUserSession) {

        console.log("Creating",createTypeExpenseDto);

        const expenseType = await this.expenseTypeRepository.create({
            ...createTypeExpenseDto,
            user_creates: user.id,
            creation_date: new Date()
        });

        return this.expenseTypeRepository.save(expenseType);
    }

    async update(id: number, updateTypeExpenseDto: UpdateExpenseTypeDto, user: IUserSession) {

        const { active, description} = updateTypeExpenseDto;

        const expenseType = await this.expenseTypeRepository.preload({
            id: id,
            ...updateTypeExpenseDto,
            user_modifies: user.id,
            modification_date: new Date()
        });

        if(!expenseType){
            throw new NotFoundException(`Expense Type #${id} not found`);
        }

        return this.expenseTypeRepository.save(expenseType);
    }

    async remove(id: number, user: IUserSession){
        const expenseType = await this.findOne(id, user);

        const expenseAlreadyHasData = await this.expenseRepository.findOne({
            where: {
                expense_type: expenseType 
            }
        });


        if(expenseAlreadyHasData){
            throw new NotFoundException(`Expense Type ${expenseType.description} can't be delete`);
        }

        return this.expenseTypeRepository.remove(expenseType);
    }
}
