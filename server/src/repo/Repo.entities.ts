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
import { Lang } from "../lang/Lang.entities";
import { Status } from "../status/Status.entities";

@Entity()
export class Repo extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @ManyToOne(() => Status, (status) => status.id)
  isPrivate: number;

  @ManyToMany(() => Lang, (lang) => lang.repos, { cascade: true })
  @JoinTable()
  langs: Lang[];

}
