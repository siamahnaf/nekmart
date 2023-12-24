import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Column } from "typeorm";

@Entity()
export class Brand {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @Column({ type: "text" })
    name: string;

    @Column({ type: "text" })
    description: string;

    @Column({ type: "text", nullable: true })
    image: string;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;
}