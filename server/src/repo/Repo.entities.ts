import "reflect-metadata";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable
} from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Lang } from "../lang/Lang.entities";
import { Status } from "../status/Status.entities";

@ObjectType()
@Entity()
export class Repo extends BaseEntity {
  @Field(() => ID!)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  gitHubKey: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  url: string;

  @Field(() => Status)
  @ManyToOne(() => Status, (status) => status.repos)
  isPrivate: Status;

  @Field(() => [Lang])
  @ManyToMany(() => Lang, (lang) => lang.repos, { cascade: true })
  @JoinTable()
  langs: Lang[];
}

@InputType()
export class NewRepo implements Partial<Repo> {
  @Field(() => String!)
  gitHubKey: string;

  @Field()
  name: string;

  @Field()
  url: string;

  @Field(() => ID)
  isPrivate: Status;

  @Field(() => [ID])
  langs: Lang[]
}
