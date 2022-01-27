import { ExpenseType } from "src/catalogue/entities/expense-type.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("expenses")
export class Expense {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ExpenseType, expenseType => expenseType.expenses)
    expense_type: ExpenseType;

    @Column("decimal", { precision: 10, scale: 2 })
    value: number;

    @Column()
    date: Date;
    
    @Column()
    observations: string;

    @Column()
    user_creates: number;
    
    @Column()
    creation_date: Date;

    @Column({ nullable: true })
    user_modifies: number;

    @Column({ nullable: true })
    modification_date: Date;

    @Column({default: true})
    active: boolean;
    
}
