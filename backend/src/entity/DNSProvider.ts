import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { Address } from "./Address"

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
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(type => Address, Address => Address.dns)
  address: Address;
}
