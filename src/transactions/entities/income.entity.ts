import { IncomeType } from "src/catalogue/entities/income-type.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('incomes')
export class Income {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => IncomeType, incomeType => incomeType.incomes)
    income_type: IncomeType;

    @Column("decimal", { precision: 10, scale: 2 })
    value: number;

    @Column()
    date: Date;

    @Column({ nullable: true })
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
