import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn
  } from "typeorm";
  import {Address} from "./Address";
  
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

    @OneToMany(type => Address, Address => Address.endpoint)
    address: Address;
  }
  