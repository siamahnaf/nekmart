import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Meta {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @Column({ type: "text", nullable: true })
    title: string;

    @Column({ type: "text", nullable: true })
    description: string;

    @Column({ type: "text", nullable: true, array: true })
    metaTags: string[];

    @Column({ type: "text", nullable: true })
    image: string;
}