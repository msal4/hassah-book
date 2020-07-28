import { ObjectType, Field, ID } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";

import { Product } from "./Product";

@ObjectType()
@Entity()
export class Publisher extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Field()
  @Column()
  name: string;

  @Field(() => [Product])
  @OneToMany(() => Product, product => product.publisher)
  products: Product[];
}
