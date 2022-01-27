import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { addDays } from 'date-fns';
import { IncomeTypesService } from 'src/catalogue/income-types/income-types.service';
import { PaginationDateDto } from 'src/common/dtos/pagination-date.dto';
import { IUserSession } from 'src/user/interfaces/user-session.interface';
import { Between, Repository } from 'typeorm';
import { CreateIncomeDto } from '../dtos/create-income.dto';
import { UpdateIncomeDto } from '../dtos/update-income.dto';
import { Income } from '../entities/income.entity';

@Injectable()
export class IncomesService {

    constructor(
        @InjectRepository(Income)
        private readonly incomeRepository: Repository<Income>,
        private readonly incomeTypeService: IncomeTypesService,
        ) {
    }

    findAll(user: IUserSession, paginationDate: PaginationDateDto) {
        const u = addDays(new Date(paginationDate.until), 1);

        return this.incomeRepository.find(
            {
                relations: ["income_type"],
                where: {
                    user_creates: user.id,
                    date: Between(paginationDate.from, u)
                }
            });
    }

    async findOne(id: number, user: IUserSession) {
        const income = await this.incomeRepository.findOne(id,{
            relations: ["income_type"],
            where: {
                user_creates: user.id
            }
        });

        if(!income) {
            throw new NotFoundException("Id not found");
        }

        return income;
    }

    async create(createIncomeDto: CreateIncomeDto, user: IUserSession) {

        const {income_type, ...othersField} = createIncomeDto;
        const incomeTypeEntity = await this.incomeTypeService.findOne(income_type, user);

        const expense = await this.incomeRepository.create({
            ...othersField,
            income_type:incomeTypeEntity,
            user_creates: user.id,
            creation_date: new Date()
        });

        return this.incomeRepository.save(expense);
    }

    async update(id: number, updateIncomeDto: UpdateIncomeDto, user: IUserSession) {
        

        const expense = await this.incomeRepository.preload({
            id: id,
            ...updateIncomeDto,
            user_modifies: user.id,
            modification_date: new Date()
        });

        if(!expense){
            throw new NotFoundException(`Expense Type #${id} not found`);
        }

        return this.incomeRepository.save(expense);
    }

    async remove(id: number, user: IUserSession){
        console.log("ID income", id)
        const income = await this.findOne(id, user);
        return this.incomeRepository.remove(income);
    }
}
