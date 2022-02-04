import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("categories")
export class Category {

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
    
}
