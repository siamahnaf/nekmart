import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, Relation } from "typeorm";

//Orm Entities
import { Attribute } from "@/attributes/model/attributes.entity";

@Entity()
export class ProductAttribute {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @ManyToMany(() => Attribute)
    @JoinTable()
    attributeIds: Relation<Attribute[]>;

    @Column({ type: "jsonb", nullable: true })
    selectedVariant: { id: string, selected: string[] }[];

    @Column({ type: "jsonb", nullable: true })
    attributes: { variant: string, price: string, quantity: string, image: string }[];
}