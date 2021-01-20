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

  
  @Entity()
  @Unique(["name"])
  export class App {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    @Length(4, 64)
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
  }
  