import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Column } from "typeorm";

@Entity()
export class BannerTwo {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @Column({ type: "text" })
    name: string;

    @Column({ type: "text" })
    url: string;

    @Column({ type: "text" })
    path: string;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;
}