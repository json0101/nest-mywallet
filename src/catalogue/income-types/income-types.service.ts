import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Income } from 'src/transactions/entities/income.entity';
import { IUserSession } from 'src/user/interfaces/user-session.interface';
import { Connection, Repository } from 'typeorm';
import { CreateIncomeTypeDto } from '../dtos/create-income-type.dto';
import { UpdateIncomeTypeDto } from '../dtos/update-income-type.dto';
import { IncomeType } from '../entities/income-type.entity';

@Injectable()
export class IncomeTypesService {

    constructor(
        @InjectRepository(IncomeType)
        private readonly incomeTypeRepository: Repository<IncomeType>,
        @InjectRepository(Income)
        private readonly incomeRepository: Repository<Income>,
    ) {
    }

    findAllActives(user: IUserSession) {
        return this.incomeTypeRepository.find({
            where: {
                user_creates: user.id,
                active: true
            }
        });
    }

    findAll(user: IUserSession) {
        return this.incomeTypeRepository.find({
            where: {
                user_creates: user.id
            }
        });
    }

    async findOne(id: number, user: IUserSession) {
        const incomeType = await this.incomeTypeRepository.findOne(id, {
            where: {
                user_creates: user.id
            }
        });

        if(!incomeType) {
            throw new NotFoundException("Id not found");
        }

        return incomeType;
    }

    async create(createTypeIncomeDto: CreateIncomeTypeDto, user: IUserSession) {

        const incomeType = this.incomeTypeRepository.create({
            ...createTypeIncomeDto,
            user_creates: user.id,
            creation_date: new Date()
        });

        return this.incomeTypeRepository.save(incomeType);
    }

    async update(id: number, updateTypeIncomeDto: UpdateIncomeTypeDto, user: IUserSession) {

        const { active, description} = updateTypeIncomeDto;

        console.log(updateTypeIncomeDto);

        const incomeType = await this.incomeTypeRepository.preload({
            id: id,
            ...updateTypeIncomeDto,
            user_modifies: user.id,
            modification_date: new Date()
        });

        if(!incomeType){
            throw new NotFoundException(`Income Type #${id} not found`);
        }

        return this.incomeTypeRepository.save(incomeType);
    }

    async remove(id: number, user: IUserSession) {
        const incomeType = await this.findOne(id, user);

        const incomeAlreadyHasData = await this.incomeRepository.findOne({
            where: {
                income_type: incomeType 
            }
        });

        if(incomeAlreadyHasData){
            throw new NotFoundException(`Income Type ${incomeType.description} can't be delete`);
        }


        return this.incomeTypeRepository.remove(incomeType);
    }
}
