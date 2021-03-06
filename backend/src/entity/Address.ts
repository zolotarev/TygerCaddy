import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";
import { Length, IsFQDN, IsFirebasePushId} from "class-validator";
import {App} from "./App";
import {Cert} from "./Cert";
import {DNSProvider} from "./DNSProvider";
import {Endpoint} from "./Endpoint";
import { LoadBalance } from "./LoadBalance";

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

  @Column({ default: false })
  custom_cert: boolean;

  @Column({ default: false })
  forceHTTPChallenge: boolean;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => App)
  @JoinTable()
    app: App[];
  @ManyToOne(type => DNSProvider, DNS => DNS.address, { nullable: true })
    dns?: DNSProvider;
  @ManyToOne(type => Cert, Cert => Cert.address, { nullable: true })
    cert: Cert;
  @ManyToOne(type => LoadBalance, LoadBalance => LoadBalance.address, { nullable: true })
  policy: LoadBalance;
  @OneToMany(() => Endpoint, endpoint => endpoint.address)
  endpoint: Endpoint[];

}
