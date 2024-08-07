import { Field, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("tbl_user")
@ObjectType()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ generated: "uuid" })
    @Field()
    token: string;

    @Field()
    @Column()
    username: string;

    @Column()
    hash: string;

    @CreateDateColumn()
    @Field()
    created_at: Date;

    @UpdateDateColumn()
    @Field()
    updated_at: Date;
}
