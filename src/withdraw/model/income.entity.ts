import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Column, ManyToOne, ManyToMany, Relation, JoinTable } from "typeorm";

//Orm Entity
import { Seller } from "@/seller/model/seller.entity";
import { Order } from "@/orders/model/orders.entity";

@Entity()
export class Income {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @ManyToOne(() => Seller)
    seller: Relation<Seller>;

    @ManyToOne(() => Order)
    orderId: Relation<Order>;

    @Column({ type: "numeric" })
    income: number;

    @Column({ type: "boolean", default: false })
    paySuccess: boolean;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;
}