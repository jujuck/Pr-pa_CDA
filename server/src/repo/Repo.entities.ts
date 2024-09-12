import "reflect-metadata";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  ManyToMany,
  JoinTable
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Lang } from "../lang/Lang.entities";
import { Status } from "../status/Status.entities";

@ObjectType()
@Entity()
export class Repo extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  url: string;

  @Field(() => Status)
  @ManyToOne(() => Status, (status) => status.id)
  isPrivate: number;

  @Field(() => Lang)
  @ManyToMany(() => Lang, (lang) => lang.repos, { cascade: true })
  @JoinTable()
  langs: Lang[];

}
