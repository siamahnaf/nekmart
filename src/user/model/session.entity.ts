import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, UpdateDateColumn, CreateDateColumn, Relation } from "typeorm";

//ORM Entity
import { User } from "./user.entity";

@Entity()
export class Session {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @Column({ type: "text" })
    cookie: string;

    @ManyToOne(() => User, (user) => user.session, { cascade: true, onDelete: "CASCADE" })
    user: Relation<User>;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at: Date;
}