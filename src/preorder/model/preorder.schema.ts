import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Column } from "typeorm";

@Entity()
export class Preorder {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @Column({ type: "text" })
    firstName: string;

    @Column({ type: "text" })
    lastName: string;

    @Column({ type: "text" })
    phone: string;

    @Column({ type: "text" })
    address: string;

    @Column({ type: "text" })
    email: string;

    @Column({ type: "text", array: true, nullable: true })
    productImage: string[];

    @Column({ type: "text", array: true })
    productUrl: string[];

    @Column({ type: "text", nullable: true })
    note: string;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;
}