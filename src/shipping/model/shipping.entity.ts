import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Column } from "typeorm";

@Entity()
export class Shipping {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @Column({ type: "text" })
    name: string;

    @Column({ type: "text" })
    rateInsideDhaka: string;

    @Column({ type: "text" })
    rateOutsideDhaka: string;

    @Column({ type: "text" })
    rateInSavar: string;

    @Column({ type: "text" })
    estimateDelivery: string;

    @Column({ type: "text", nullable: true })
    description: string;


    @Column({ type: "boolean", default: false })
    active: boolean;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;
}