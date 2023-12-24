import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Column, ManyToOne, Relation } from "typeorm";

//Orm entity
import { Category } from "./category.entity";

@Entity()
export class SubCategory {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @Column({ type: "text" })
    name: string;

    @ManyToOne(() => Category, category => category.sub_category)
    category: Relation<Category>;

    @Column({ type: "text", nullable: true })
    image: string;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;
}