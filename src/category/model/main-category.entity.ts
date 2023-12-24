import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Column, OneToMany, Relation } from "typeorm";

//Orm Entity
import { Category } from "./category.entity";

@Entity()
export class MainCategory {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @Column({ type: "text" })
    name: string;

    @Column({ type: "text", nullable: true })
    image: string;

    @Column({ type: "text", nullable: true })
    description: string;

    @OneToMany(() => Category, category => category.main_category, { cascade: true })
    category: Relation<Category[]>;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;
}