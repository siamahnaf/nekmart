import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, ManyToOne, Relation, Column, ManyToMany, JoinTable } from "typeorm";

//Orm entity
import { Seller } from "@/seller/model/seller.entity";
import { OrderProduct } from "./order-product.entity";
import { Order } from "./orders.entity";

@Entity()
export class OrderSeller {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @ManyToOne(() => Seller)
    sellerId: Relation<Seller>;

    @ManyToOne(() => Order, order => order.sellers, { cascade: true })
    order: Order;

    @Column({ type: "text" })
    shopName: string;

    @ManyToMany(() => OrderProduct)
    @JoinTable()
    products: Relation<OrderProduct[]>;

    @Column({ type: "numeric" })
    price: number;

    @Column({ type: "text", enum: ["Pending", "Confirmed", "Picked up", "On the way", "Delivered", "Cancelled"], default: "Pending" })
    status: string;

    @Column({ type: "text", enum: ["user", "admin"], nullable: true })
    cancelBy: string;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;
}