import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Column, ManyToOne, Relation, ManyToMany, JoinTable, OneToOne, JoinColumn, DeleteDateColumn } from "typeorm";

//Orm Entity
import { Seller } from "@/seller/model/seller.entity";
import { MainCategory } from "@/category/model/main-category.entity";
import { Category } from "@/category/model/category.entity";
import { SubCategory } from "@/category/model/sub-category.entity";
import { Brand } from "@/brand/model/brand.entity";
import { Tag } from "@/tag/model/tag.entity";
import { Flash } from "@/flash/model/flash.entity";
import { ProductAttribute } from "./attribute.entity";
import { Meta } from "./meta.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @Column({ type: "text" })
    name: string;

    @ManyToOne(() => Seller)
    seller: Relation<Seller>;

    @ManyToOne(() => MainCategory)
    main_category: Relation<MainCategory>;

    @ManyToOne(() => Category)
    category: Relation<Category>;

    @ManyToMany(() => SubCategory)
    @JoinTable()
    sub_category: Relation<SubCategory[]>;

    @ManyToOne(() => Brand)
    brand: Relation<Brand>;

    @Column({ type: "text", nullable: true })
    unit: string;

    @Column({ type: "text", nullable: true })
    minPurchase: string;

    @ManyToMany(() => Tag)
    @JoinTable()
    tag: Relation<Tag[]>;

    @Column({ type: "boolean" })
    refundAble: boolean;

    @Column({ type: "text", array: true })
    images: string[];

    @Column({ type: "text", nullable: true })
    youtubeLink: string;

    @ManyToOne(() => Flash)
    flash: Relation<Flash>;

    @Column({ type: "text" })
    price: string;

    @Column({ type: "text" })
    quantity: string;

    @Column({ type: "text" })
    discount: string;

    @Column({ type: "text", enum: ["flat", "percent"] })
    discountUnit: string;

    @ManyToOne(() => ProductAttribute)
    attributes: Relation<ProductAttribute>;

    @Column({ type: "text", nullable: true })
    description: string;

    @Column({ type: "jsonb", nullable: true })
    specification: { title: string, value: string }[];

    @Column({ type: "boolean" })
    visibility: boolean;

    @Column({ type: "boolean", default: false })
    is_approved: boolean;

    @Column({ type: "boolean", default: false })
    is_hide: boolean;

    @OneToOne(() => Meta)
    @JoinColumn()
    meta: Relation<Meta>;

    @Column({ type: "text", nullable: true })
    estimateDelivery: string;

    @Column({ type: "text", nullable: true })
    warranty: string;

    @Column({ type: "boolean", nullable: true })
    showStock: boolean;

    @Column({ type: "text" })
    tax: string;

    @Column({ type: "text", enum: ["flat", "percent"] })
    taxUnit: string;

    @Column({ type: "text" })
    totalPrice: string;

    @Column({ type: "text", nullable: true })
    disclaimer: string;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;

    @DeleteDateColumn({ type: "timestamptz" })
    deleted_at: Date;
}
