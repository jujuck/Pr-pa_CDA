import "reflect-metadata";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany
} from "typeorm";
import { Field, ObjectType, ID } from "type-graphql";
import { Repo } from "../repo/Repo.entities";

@ObjectType()
@Entity()
export class Lang extends BaseEntity {
  @Field(() => ID!)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Repo])
  @ManyToMany(() => Repo, (repo) => repo.langs)
  repos: Repo[];
}
