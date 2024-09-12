import "reflect-metadata";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Repo } from "../repo/Repo.entities";

@ObjectType()
@Entity()
export class Lang extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Repo)
  @ManyToMany(() => Repo, (repo) => repo.langs, { onDelete: "CASCADE" })
  repos: Repo[];
}
