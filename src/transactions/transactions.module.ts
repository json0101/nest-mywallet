import { Module } from '@nestjs/common';
import { IncomesController } from './incomes/incomes.controller';
import { IncomesService } from './incomes/incomes.service';
import { ExpensesController } from './expenses/expenses.controller';
import { ExpensesService } from './expenses/expenses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Income } from './entities/income.entity';
import { Expense } from './entities/expense.entity';
import { CatalogueModule } from 'src/catalogue/catalogue.module';

@Module({
  imports: [TypeOrmModule.forFeature([Income, Expense]), CatalogueModule],
  controllers: [IncomesController, ExpensesController],
  providers: [IncomesService, ExpensesService],
  exports: [ExpensesService, IncomesService]
})
export class TransactionsModule {}
