import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, ManyToOne, Relation, Column } from "typeorm";

//Orm entity
import { Product } from "@/product/model/product.entity";

@Entity()
export class OrderProduct {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @ManyToOne(() => Product)
    productId: Relation<Product>;

    @Column({ type: "numeric" })
    quantity: number;

    @Column({ type: "json", nullable: true })
    variation: { id: string, name: string, variant: string }[];

    @Column({ type: "numeric" })
    tax: number;

    @Column({ type: "numeric" })
    amount: number;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;
}