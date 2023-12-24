import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Column, ManyToOne, Relation } from "typeorm";

//Orm Entity
import { Seller } from "@/seller/model/seller.entity";
import { User } from "@/user/model/user.entity";


@Entity()
export class Withdraw {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @ManyToOne(() => Seller)
    seller: Relation<Seller>;

    @Column({ type: "numeric" })
    amount: number;

    @ManyToOne(() => User)
    releasedBy: User;

    @Column({ type: "text" })
    method: string;

    @Column({ type: "text", enum: ["Processing", "Confirmed"], default: "Processing" })
    status: string;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;
}

