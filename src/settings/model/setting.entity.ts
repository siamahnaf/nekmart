import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Column } from "typeorm";

@Entity()
export class Settings {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @Column({ type: "text", nullable: true })
    logo: string;

    @Column({ type: "text", nullable: true })
    icon: string;

    @Column({ type: "text", nullable: true })
    siteTitle: string;

    @Column({ type: "text", nullable: true })
    slogan: string;

    @Column({ type: "text", nullable: true })
    metaTitle: string;

    @Column({ type: "text", nullable: true })
    metaDescription: string;

    @Column({ type: "text", nullable: true, array: true })
    metaTag: string[];

    @Column({ type: "text", nullable: true })
    siteUrl: string;

    @Column({ type: "text", nullable: true })
    ogTitle: string;

    @Column({ type: "text", nullable: true })
    ogDescription: string;

    @Column({ type: "text", nullable: true })
    ogImage: string;

    @Column({ type: "text", nullable: true })
    email: string;

    @Column({ type: "text", nullable: true })
    phone: string;

    @Column({ type: "text", nullable: true })
    corporateOffice: string;

    @Column({ type: "text", nullable: true })
    headOffice: string;

    @Column({ type: "text", nullable: true })
    facebook: string;

    @Column({ type: "text", nullable: true })
    instagram: string;

    @Column({ type: "text", nullable: true })
    youtube: string;

    @Column({ type: "text", nullable: true })
    twitter: string;

    @Column({ type: "text", nullable: true })
    linkedIn: string;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;
}