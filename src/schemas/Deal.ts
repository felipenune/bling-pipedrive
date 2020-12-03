import {Entity, ObjectID, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity('deals')
export class Deal {

@ObjectIdColumn()
id: ObjectID;

@Column()
deal_id: number;

@Column()
title: string;

@Column()
value: number;

@Column()
org_name: string;

@Column()
cc_email: string;

@CreateDateColumn()
created_at: string;

@UpdateDateColumn()
updated_at: string;

}