import {Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { Deal } from "./Deal";

@Entity('orders')
export class Order {

@ObjectIdColumn()
id: ObjectID;

@Column()
date: string;

@Column()
deals: Deal[];

@Column()
total: number;

@CreateDateColumn()
created_at: string;

@UpdateDateColumn()
updated_at: string;

}