import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Column } from "typeorm";

@Entity()
export class Flash {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @Column({ type: "text" })
    title: string;

    @Column({ type: "text", nullable: true })
    image: string;

    @Column({ type: "text", nullable: true })
    thumb: string;

    @Column({ type: "timestamptz" })
    start: Date;

    @Column({ type: "timestamptz" })
    expires: Date;

    @Column({ type: "text" })
    discount: string;

    @Column({ type: "text" })
    discountUnit: string;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;
}