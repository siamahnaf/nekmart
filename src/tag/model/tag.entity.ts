import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from "typeorm";

@Entity()
export class Tag {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @Column({ type: "text" })
    name: string;

    @Column({ type: "text", nullable: true })
    description: string;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;
}