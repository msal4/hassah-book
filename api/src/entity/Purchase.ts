import { ObjectType, Field, ID, Int } from "type-graphql";
import {
  Entity,
  BaseEntity,
  ManyToOne,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { Product } from "@api/entity/Product";
import { Order } from "@api/entity/Order";
import { Lazy } from "@api/modules/types/Lazy";

@ObjectType()
@Entity()
export class Purchase extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Field(() => Int)
  @Column({ type: "integer", default: 1 })
  quantity: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.favorites)
  product: Lazy<Product>;

  @Field(() => Order)
  @ManyToOne(() => Order, (order) => order.purchases)
  order: Lazy<Order>;
}
