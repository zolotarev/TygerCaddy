import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn
  } from "typeorm";
  import { Length, IsNotEmpty } from "class-validator";
  import * as bcrypt from "bcryptjs";
  import { DNSProvider } from "./DNSProvider";

  @Entity()
  export class Config {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    @Length(4, 20)
    server_name: string;
  
    @Column()
    automatic_https: boolean;
  
    @Column()
    redirect_https: boolean;
  
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

  }
  