import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('address')
export class Address {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    userId:number;

    @Column({ nullable: true })
    landmark:string;

    @Column()
    city:string;

    @Column()
    state:string;

    @Column()
    pincode:string;

    @Column()
    country:string;
}