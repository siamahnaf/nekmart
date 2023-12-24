import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Column, ManyToOne, Relation, OneToMany } from "typeorm";

//Orm Entity
import { User } from "@/user/model/user.entity";
import { OrderSeller } from "./order-seller.entity";
import { Address } from "@/address/model/address.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @Column({ type: "text" })
    orderId: string;

    @OneToMany(() => OrderSeller, seller => seller.order)
    sellers: Relation<OrderSeller[]>;

    @Column({ type: "numeric" })
    couponDiscount: number;

    @Column({ type: "numeric" })
    total: number;

    @Column({ type: "numeric" })
    subtotal: number;

    @Column({ type: "numeric" })
    shippingCount: number;

    @Column({ type: "numeric" })
    shippingFees: number;

    @Column({ type: "text", nullable: true })
    estimateDelivery: string;

    @Column({ type: "json", nullable: true })
    payment: { paymentMethod: string, paymentId: string, provider: string };

    @ManyToOne(() => Address)
    shippingAddress: Relation<Address>;

    @ManyToOne(() => Address)
    billingAddress: Relation<Address>;

    @Column({ type: "text", nullable: true })
    note: string;

    @ManyToOne(() => User)
    user: Relation<User>;

    @Column({ type: "boolean", default: false })
    paymentStatus: boolean;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;
}