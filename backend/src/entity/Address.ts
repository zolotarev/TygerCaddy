import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";
import { Length, IsFQDN, IsFirebasePushId} from "class-validator";
import {App} from "./App";
import {Cert} from "./Cert";
import {Endpoint} from "./Endpoint";

@Entity()
@Unique(["address"])
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsFQDN()
  address: string;

  @Column()
  tls: boolean;

  @Column()
  staging: boolean;

  @Column()
  custom_cert: boolean;

  @Column({ default: false })
  forceHTTPChallenge: boolean;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(type => App, App => App.address)
    app: App;
  @ManyToOne(type => Cert, Cert => Cert.address)
    cert: Cert;
  @OneToMany(() => Endpoint, endpoint => endpoint.address)
  endpoint: Endpoint[];

}
