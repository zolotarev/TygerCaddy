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

    @ManyToOne(type => Address, Address => Address.endpoints)
    address: Address;

    @OneToOne(type => App)
    @JoinColumn()
    app:App
  }
  