import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { Length, IsFQDN, IsFirebasePushId} from "class-validator";
import {App} from "./App";
import {Endpoint} from "./Endpoint";

@Entity()
@Unique(["address"])
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsFQDN()
  address: string;

  @Column()
  tls: boolean;

  @Column()
  staging: boolean;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(type => App, App => App.address)
    app: App;
  @ManyToOne(type => Endpoint, Endpoint => Endpoint.address)
    endpoint: Endpoint;
}
