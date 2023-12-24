import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Column, OneToOne, Relation } from "typeorm";

//Orm entity
import { Seller } from "./seller.entity";

@Entity()
export class Bank {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @Column({ type: "text" })
    name: string;

    @Column({ type: "text" })
    accNumber: string;

    @Column({ type: "text" })
    routing: string;

    @Column({ type: "text" })
    bankName: string;

    @Column({ type: "text" })
    branch: string;

    @OneToOne(() => Seller, seller => seller.bank)
    seller: Relation<Seller>;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;
}