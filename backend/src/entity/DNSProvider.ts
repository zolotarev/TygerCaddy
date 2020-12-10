import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { Length } from "class-validator";
import { Config } from "./Config";

@Entity()
@Unique(["name"])
export class DNSProvider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  api_key: string;

  @Column({default:false})
  active: boolean;

  @Column()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

}
