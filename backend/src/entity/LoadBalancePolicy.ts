import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn
  } from "typeorm";
  import { Length, IsNotEmpty, IsIP, IsPort } from "class-validator";
  import * as bcrypt from "bcryptjs";
  import {LoadBalance} from "./LoadBalance";
  import {Endpoint} from "./Endpoint";
  import { isIPv4 } from "net";
  
  @Entity()
  @Unique(["name"])
  export class LoadBalancePolicy {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(4, 50)
    name: string;

    @Column()
    description: string;
  
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(type => LoadBalance, LoadBalance => LoadBalance.policy)
      policy: LoadBalance;
  }
  