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
  import {Address} from "./Address";
  import {Endpoint} from "./Endpoint";
  import { isIPv4 } from "net";
  
  @Entity()
  @Unique(["name"])
  export class App {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    @Length(4, 20)
    name: string;
  
    @Column()
    @IsIP()
    ip_address: string;

    @Column()
    @IsPort()
    port_number: string;

    @Column()
    verify_ssl: boolean;
  
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(type => Address, Address => Address.app)
      address: Address;
  }
  