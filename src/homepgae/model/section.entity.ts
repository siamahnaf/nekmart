import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Column, ManyToOne, Relation } from "typeorm";

//Orm Entity
import { MainCategory } from "@/category/model/main-category.entity";

@Entity()
export class Section {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @Column({ type: "text" })
    name: string;

    @Column({ type: "text" })
    description: string;

    @Column({ type: "text", enum: ["category", "latest", "sale"] })
    base: string;

    @ManyToOne(() => MainCategory)
    category: Relation<MainCategory>;

    @Column({ type: "boolean" })
    publish: boolean;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;
}