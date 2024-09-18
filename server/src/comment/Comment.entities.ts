import "reflect-metadata";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType, ID, InputType } from "type-graphql";
import { Repo } from "../repo/Repo.entities";

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @Field(() => ID!)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Repo)
  @ManyToOne(() => Repo, (repo) => repo.comments, { onDelete: "SET NULL" })
  repo: Repo;

  @Field()
  @Column()
  gitHubKey: string;

  @Field()
  @Column()
  text: String;
}

@InputType()
export class NewComment implements Partial<Comment> {
  @Field(() => ID!)
  gitHubKey: string;

  @Field()
  text: string;
}
