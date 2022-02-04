import { Module } from '@nestjs/common';
import { IncomeTypesController } from './income-types/income-types.controller';
import { ExpenseTypesController } from './expense-types/expense-types.controller';
import { ExpenseTypesService } from './expense-types/expense-types.service';
import { IncomeTypesService } from './income-types/income-types.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncomeType } from './entities/income-type.entity';
import { ExpenseType } from './entities/expense-type.entity';
import { Expense } from 'src/transactions/entities/expense.entity';
import { Income } from 'src/transactions/entities/income.entity';
import { Category } from './entities/category.entity';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([IncomeType, ExpenseType, Expense, Income, Category])],
  controllers: [IncomeTypesController, ExpenseTypesController, CategoriesController],
  providers: [ExpenseTypesService, IncomeTypesService, CategoriesService],
  exports: [IncomeTypesService, ExpenseTypesService, CategoriesService]
})
export class CatalogueModule {}
