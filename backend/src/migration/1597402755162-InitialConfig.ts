import {MigrationInterface, QueryRunner, getRepository} from "typeorm";
import { Config } from "../entity/Config";
import { DNSProvider } from "../entity/DNSProvider";
import { LoadBalancePolicy } from "../entity/LoadBalancePolicy";
export class InitialConfig1597402755162 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
            let config = new Config();
            config.server_name = "TygerCaddy";
            config.automatic_https = true;
            config.redirect_https = true;
            const configRepository = getRepository(Config);
            await configRepository.save(config);

            let dns = [
                {name: "digitalocean", api_key: "", active: false},
                {name: "cloudflare", api_key: "", active: false},
                {name: "route53", api_key: "", active: false},
                {name: "gandi", api_key: "", active: false},
            ]


            const dnsRepository = getRepository(DNSProvider);
            await dnsRepository.save(dns);
            
            let LoadBalancePolicies = [
                {name:"first", description:"Choose the first available upstream"},
                {name:"least_conn", description:"Choose upstream with fewest number of current requests"},
                {name:"random", description:"Randomly choose an upstream"},
                {name:"round_robin", description:"Iterate each upstream in turn"},
            ]
            const lbRepository = getRepository(LoadBalancePolicy);
            await lbRepository.save(LoadBalancePolicies);
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
