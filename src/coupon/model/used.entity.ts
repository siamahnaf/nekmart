import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Column, Relation, ManyToOne } from "typeorm";

//Orm entity
import { User } from "@/user/model/user.entity";

@Entity()
export class UsedCoupon {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @Column({ type: "text" })
    code: string;

    @Column({ type: "text" })
    discount: string;

    @Column({ type: "text" })
    discountUnit: string;

    @ManyToOne(() => User)
    user: Relation<User>;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;
}