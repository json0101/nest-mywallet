import { Module } from '@nestjs/common';
import { IncomesController } from './incomes/incomes.controller';
import { IncomesService } from './incomes/incomes.service';
import { ExpensesController } from './expenses/expenses.controller';
import { ExpensesService } from './expenses/expenses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Income } from './entities/income.entity';
import { Expense } from './entities/expense.entity';
import { IncomeTypesService } from 'src/catalogue/income-types/income-types.service';
import { ExpenseTypesService } from 'src/catalogue/expense-types/expense-types.service';
import { CatalogueModule } from 'src/catalogue/catalogue.module';
import { IncomeType } from 'src/catalogue/entities/income-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Income, Expense]), CatalogueModule],
  controllers: [IncomesController, ExpensesController],
  providers: [IncomesService, ExpensesService]
})
export class TransactionsModule {}
