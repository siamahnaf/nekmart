import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Column, Relation, ManyToOne } from "typeorm";

//Orm entity
import { User } from "@/user/model/user.entity";

@Entity()
export class Coupon {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @Column({ type: "text" })
    name: string;

    @Column({ type: "text" })
    code: string;

    @Column({ type: "text" })
    discount: string;

    @Column({ type: "text", enum: ["flat", "percent"] })
    discountUnit: string;

    @Column({ type: "text" })
    minimumPurchase: string;

    @Column({ type: "timestamptz", nullable: true })
    expires: Date;

    @ManyToOne(() => User, { nullable: true })
    createdBy: Relation<User>;

    @Column({ type: "text", nullable: true })
    points: string;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;
}