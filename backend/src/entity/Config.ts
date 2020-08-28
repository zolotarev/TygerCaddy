import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn
  } from "typeorm";
  import { Length, IsNotEmpty } from "class-validator";
  import * as bcrypt from "bcryptjs";
  
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
    use_dns_verification: boolean;
  
    @Column()
    @IsNotEmpty()
    dns_provider_name: string;
  
    @Column()
    dns_api_token: string;
  
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
  }
  