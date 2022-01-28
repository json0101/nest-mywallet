import { Income } from "src/transactions/entities/income.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("income_types")
export class IncomeType {

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

    @OneToMany(() => Income, income => income.income_type)
    incomes: Income[];
}
