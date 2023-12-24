import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, ManyToOne, Relation } from "typeorm";

//Entity
import { User } from "@/user/model/user.entity";
import { Product } from "@/product/model/product.entity";

@Entity()
export class Wishlist {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @ManyToOne(() => User)
    user: Relation<User>;

    @ManyToOne(() => Product)
    product: Relation<Product>;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;
}