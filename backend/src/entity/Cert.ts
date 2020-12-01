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
  export class Cert {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(4, 50)
    name: string;

    @Column()
    cert_path: string;
  
    @Column()
    pem_path: string;
  
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(type => Address, Address => Address.cert)
      address: Address;
  }
  