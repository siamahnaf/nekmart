import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, DeleteDateColumn, Column, ManyToOne, Relation } from "typeorm";

//Orm Entity
import { User } from "@/user/model/user.entity";

@Entity()
export class Address {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @Column({ type: "text" })
    name: string;

    @Column({ type: "text" })
    phone: string;

    @Column({ type: "text", enum: ["male", "female", "other"], nullable: true })
    gender: string;

    @Column({ type: "text" })
    address: string;

    @Column({ type: "text" })
    country: string;

    @Column({ type: "text" })
    city: string;

    @Column({ type: "text" })
    area: string;

    @Column({ type: "text", nullable: true })
    postal: string;

    @Column({ type: "boolean", default: false })
    default: boolean;

    @ManyToOne(() => User)
    user: Relation<User>;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;

    @DeleteDateColumn({ type: "timestamptz" })
    deleted_at: Date;
}