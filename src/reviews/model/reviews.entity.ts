import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, ManyToOne, Column } from "typeorm";

//Orm Entity
import { User } from "@/user/model/user.entity";
import { Seller } from "@/seller/model/seller.entity";
import { Product } from "@/product/model/product.entity";

@Entity()
export class Review {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => Seller)
    seller: Seller;

    @ManyToOne(() => Product)
    product: Product;

    @Column({ type: "text", array: true })
    image: string[];

    @Column({ type: "text" })
    comment: string;

    @Column({ type: "text", nullable: true })
    reply: string;

    @Column({ type: "numeric" })
    rating: number;

    @Column({ type: "boolean", default: false, nullable: true })
    publish: boolean;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;
}