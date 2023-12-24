import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Column } from "typeorm";

@Entity()
export class Platform {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @Column({ type: "text" })
    charge: string;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;
}