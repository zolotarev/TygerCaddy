import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn
  } from "typeorm";
  import { Length, IsNotEmpty, IsFQDN } from "class-validator";
  import * as bcrypt from "bcryptjs";
  import {Address} from "./Address";
  
  @Entity()
  @Unique(["name"])
  export class App {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    @Length(4, 20)
    name: string;
  
    @Column()
    @IsFQDN()
    url: string;
  
    @Column()
    verify_ssl: boolean;
  
    @Column()
    transparent: boolean;
  
    @Column()
    websocket: boolean;
  
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
  
    @OneToMany(type => Address, Address => Address.app)
      address: Address;
  
  }
  