import "reflect-metadata";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Repo } from "../repo/Repo.entities";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Status extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  label: string;

  @Field(() => Repo)
  @OneToMany(() => Repo, (repo) => repo.isPrivate, { onDelete: "CASCADE" })
  repos?: Repo[];
}
