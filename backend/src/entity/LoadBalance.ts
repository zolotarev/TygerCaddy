import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn
  } from "typeorm";
  import { Length } from "class-validator";
  import {LoadBalancePolicy} from "./LoadBalancePolicy";
  import {Address} from "./Address";

  
  @Entity()
  @Unique(["name"])
  export class LoadBalance {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(4, 50)
    name: string;

    @Column()
    try_duration: string;

    @Column()
    try_interval: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(type => LoadBalancePolicy, LoadBalancePolicy => LoadBalancePolicy.policy, { nullable: true })
    policy: LoadBalancePolicy;
    
    @ManyToOne(type => Address, Address => Address.policy, { nullable: true })
    address: Address;
  }
  