import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, ManyToOne, Column } from "typeorm";

//Orm entity
import { Refundable } from "./refundable.entity";
import { User } from "@/user/model/user.entity";

@Entity()
export class Refund {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @ManyToOne(() => Refundable)
    refundableId: Refundable;

    @ManyToOne(() => User)
    user: User;

    @Column({ type: "numeric" })
    quantity: number;

    @Column({ type: "text" })
    reason: string;

    @Column({ type: "text" })
    description: string;

    @Column({ type: "text", enum: ["Approved", "Pending", "Cancelled"], default: "Pending" })
    status: string;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;
}