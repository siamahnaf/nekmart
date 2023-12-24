import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, Relation, OneToMany } from "typeorm";

//Entity
import { Session } from "./session.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @Column({ type: "text" })
    phone: string;

    @Column({ type: "text", nullable: true })
    name: string;

    @Column({ type: "text", nullable: true })
    email: string;

    @OneToMany(() => Session, (session) => session.user)
    session: Relation<Session[]>;

    @Column({ type: "text", nullable: true })
    avatar: string;

    @Column({ type: "text", select: false, nullable: true })
    password: string;

    @Column({ type: "text", enum: ["user", "seller", "editor", "moderator", "admin"], default: "user" })
    role: string;

    @Column({ type: "text", nullable: true, select: false })
    otp: string;

    @Column({ type: "jsonb", nullable: true })
    provider: { name: string, id: string };

    @Column({ type: "boolean", default: false })
    is_verified: boolean;

    @Column({ type: "boolean", default: false })
    is_banned: boolean;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;
}