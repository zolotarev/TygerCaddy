import {MigrationInterface, QueryRunner, getRepository} from "typeorm";
import { Config } from "../entity/Config";
import { DNSProvider } from "../entity/DNSProvider";
export class InitialConfig1597402755162 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
            let config = new Config();
            config.server_name = "TygerCaddy";
            config.automatic_https = true;
            config.redirect_https = true;
            config.use_dns_verification = false;
            //config.dns_provider_name = "";
            config.dns_api_token = "";
            const configRepository = getRepository(Config);
            await configRepository.save(config);

            let dns = [
                {name: "digitalocean", api_key: "", active: "false"},
                {name: "cloudflare", api_key: "", active: "false"},
                {name: "route53", api_key: "", active: "false"},
                {name: "gandi", api_key: "", active: "false"},
            ]


            const dnsRepository = getRepository(DNSProvider);
            await dnsRepository.save(dns);
            
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
