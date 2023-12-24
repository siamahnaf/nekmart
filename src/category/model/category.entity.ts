import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Column, ManyToOne, OneToMany, Relation } from "typeorm";

//Orm entity
import { MainCategory } from "./main-category.entity";
import { SubCategory } from "./sub-category.entity";

@Entity()
export class Category {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @Column({ type: "text" })
    name: string;

    @Column({ type: "text", nullable: true })
    image: string;

    @ManyToOne(() => MainCategory, main => main.category)
    main_category: Relation<MainCategory>;

    @OneToMany(() => SubCategory, sub => sub.category, { cascade: true })
    sub_category: Relation<SubCategory[]>;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;
}