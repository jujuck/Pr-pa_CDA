import "reflect-metadata";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany
} from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Lang } from "../lang/Lang.entities";
import { Status } from "../status/Status.entities";
import { Comment } from "../comment/Comment.entities";

@ObjectType()
@Entity()
export class Repo extends BaseEntity {
  @Field(() => ID!)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column({ unique: true })
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

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.repo, { cascade: false })
  comments?: Comment[];
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
