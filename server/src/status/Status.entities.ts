import "reflect-metadata";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Repo } from "../repo/Repo.entities";
import { Field, InputType, ObjectType, ID } from "type-graphql";

@ObjectType()
@Entity()
export class Status extends BaseEntity {
  @Field(() => ID!)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  label: string;

  @Field(() => [Repo])
  @OneToMany(() => Repo, (repo) => repo.isPrivate, { onDelete: "CASCADE" })
  repos?: Repo[];
}

@InputType()
export class NewStatus implements Partial<Status> {
  @Field()
  label: string;
}
