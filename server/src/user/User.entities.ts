import "reflect-metadata";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { IsEmail, Length } from 'class-validator';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID!)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @IsEmail({}, { message: "Wrong email"})
  @Column({ unique: true })
  email: string;

  @Field()
  @Length(8, 20, { message: 'Password must be between 8 and 20 characters' })
  @Column()
  password: string;
}

@InputType()
export class Sign implements Partial<User> {
  @Field(() => ID!)
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @Field()
  @Length(8, 20, { message: 'Password must be between 8 and 20 characters' })
  password: string;
}
