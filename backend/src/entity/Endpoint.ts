import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn
  } from "typeorm";
  import {Address} from "./Address";
  import {App} from "./App";
  @Entity()
  export class Endpoint {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    endpoint: string;
  
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(type => App)
    @JoinColumn()
    app:App

    @ManyToOne(() => Address, address => address.endpoint)
    address: Address;
  }
  