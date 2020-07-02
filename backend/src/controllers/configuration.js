import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import db from '../models';

const Configuration = db.Configuration;

// load input validation
//import validateConfigForm from '../validation/config/config.validation';

// fetch config by id
const findConfigById = (req, res) => {
    const id = 1;
    //console.log("Executing Query")
    Configuration.findAll({ where: { id } })
      .then(result => {
        if(!result.length) {
          return res.json({ msg: 'Config not found'})
        }
        res.json(result[0])
      })
      .catch(err => res.status(500).json({ err }));
  };
  const findAllConfig = (req, res) => {
    Configuration.findAll().then(config => {
      res.json({ config })
    }).catch(err => res.status(500).json({ err }));
  };
// update the config
const updateConfig = (req, res) => {
    let {
        server_name,
        automatic_https,
        redirect_https,
        persist,
        disabled,
        enforce_origin,
        listen,
        origins,
        external_address,
        external_port,
        use_dns_verification,
        dns_provider_name,
        dns_api_token
    } = req.body;
    const id = 1;
  
    Configuration.update(
      {
        server_name,
        automatic_https,
        redirect_https,
        persist,
        disabled,
        enforce_origin,
        listen,
        origins,
        external_address,
        external_port,
        use_dns_verification,
        dns_provider_name,
        dns_api_token
      },
      { where: { id } }
    )
      .then(config => res.status(200).json({ config }))
      .catch(err => res.status(500).json({ err }));
  };
  export { 
    findConfigById, 
    updateConfig,
    findAllConfig
}