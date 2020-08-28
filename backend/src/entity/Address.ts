import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { Length, IsFQDN} from "class-validator";
import {App} from "./App";

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

}
