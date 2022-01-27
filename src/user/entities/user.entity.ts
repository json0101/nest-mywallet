import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("users")
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Unique('Duplicate user', ['user_name'])
    user_name: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    user_creates: number;

    @Column()
    creation_date: Date;

    @Column({ nullable: true })
    user_modifies: number;

    @Column({ nullable: true })
    modification_date: Date;

    @Column()
    active: boolean;
    
}
