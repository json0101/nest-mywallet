import { Expense } from "src/transactions/entities/expense.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("expense_types")
export class ExpenseType {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;
    

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
    
    @OneToMany(() => Expense, expense => expense.expense_type)
    expenses: Expense[];
}
