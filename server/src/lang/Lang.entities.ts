import "reflect-metadata";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany
} from "typeorm";
import { Repo } from "../repo/Repo.entities";

@Entity()
export class Lang extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Repo, (repo) => repo.langs, { onDelete: "CASCADE" })
  repos: Repo[];
}
