import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Column, OneToOne, JoinColumn, Relation } from "typeorm";

//Orm Entity
import { Bank } from "./bank.entity";
import { User } from "@/user/model/user.entity";

@Entity()
export class Seller {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @Column({ type: "text" })
    shopName: string;

    @Column({ type: "text" })
    phone: string;

    @Column({ type: "text" })
    logo: string;

    @Column({ type: "text" })
    banner: string;

    @Column({ type: "text" })
    address: string;

    @Column({ type: "text", nullable: true })
    metaTitle: string;

    @Column({ type: "text", nullable: true })
    metaDescription: string;

    @Column({ type: "boolean", default: false })
    is_verified: boolean;

    @Column({ type: "boolean", default: false })
    is_banned: boolean;

    @OneToOne(() => Bank, bank => bank.seller, { cascade: true })
    @JoinColumn()
    bank: Relation<Bank>;

    @OneToOne(() => User)
    @JoinColumn()
    user: Relation<User>;

    @Column({ type: "numeric", default: 0 })
    totalReview: number;

    @Column({ type: "numeric", default: 0 })
    totalRating: number;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;
}