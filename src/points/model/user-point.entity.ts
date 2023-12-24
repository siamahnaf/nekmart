import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Relation } from "typeorm";

//Orm Entity
import { User } from "@/user/model/user.entity";

@Entity()
export class UserPoints {
    @PrimaryGeneratedColumn("identity")
    id: string;

    @Column({ type: "numeric", default: 0 })
    points: number;

    @OneToOne(() => User)
    @JoinColumn()
    user: Relation<User>;
}