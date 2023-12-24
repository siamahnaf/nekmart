import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, Relation, ManyToOne } from "typeorm";

//Orm entity
import { User } from "@/user/model/user.entity";
import { Order } from "@/orders/model/orders.entity";

@Entity()
export class Points {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @Column({ type: "numeric" })
    points: number;

    @ManyToOne(() => User)
    user: Relation<User>;

    @ManyToOne(() => Order)
    order: Relation<Order>;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;
}