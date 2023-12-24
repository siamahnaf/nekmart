import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, ManyToOne, Column } from "typeorm";

//Orm entity
import { Product } from "@/product/model/product.entity";
import { Order } from "@/orders/model/orders.entity";
import { Seller } from "@/seller/model/seller.entity";
import { User } from "@/user/model/user.entity";
import { Address } from "@/address/model/address.entity";

@Entity()
export class Refundable {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @ManyToOne(() => Product)
    productId: Product;

    @ManyToOne(() => Order, { nullable: true })
    order: Order;

    @Column({ type: "text" })
    orderID: string;

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => Seller)
    seller: Seller;

    @ManyToOne(() => Address)
    address: Address;

    @Column({ type: "numeric" })
    quantity: number;

    @Column({ type: "json", nullable: true })
    variation: { id: string, name: string, size: string }[];

    @Column({ type: "numeric" })
    couponDiscount: number;

    @Column({ type: "numeric" })
    amount: number;

    @Column({ type: "boolean", default: false })
    refundable: boolean;

    @Column({ type: "boolean", default: false })
    refunded: boolean;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;
}