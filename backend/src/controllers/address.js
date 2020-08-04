import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import db from '../models';

const Address = db.Address;
const App = db.App;

const caddy = require('../services/caddyService');

// load input validation
import validateAddressForm from '../validation/address/address.validation';

// create address
const createAddress = (req, res) => {
    const { errors, isValid } = validateAddressForm(req.body);
    let { 
        address, 
        tls, 
        staging,
        AppId,
    } = req.body;
    //check validation
    if(!isValid) {
      return res.status(400).json(errors);
    }
  
    Address.findAll({ where: { address } }).then(foundAddress => {
      if (foundAddress.length) {
        return res.status(400).json({ address: 'Address already exists!' });
      } else {
        let newAddress = { 
          address, 
          tls, 
          staging,
          AppId
        };
        
            Address.create(newAddress)
              .then(address => {
                caddy.addCaddyApp(address.id);
                  res.json({ address });
               
                
              })
              .catch(err => {
                res.status(500).json({ err });
              });
      }
    });
  };
  // fetch all addresses
const findAllAddresses = (req, res) => {
    Address.findAll({
      include:[
        {
        model: App
        }
    ]
    })
      .then(addresses => {
        var config = caddy.getCaddyConfig();
        res.json({ addresses });
      })
      .catch(err => res.status(500).json({ err }));
  };

  // fetch address by addressId
const findAddressById = (req, res) => {
    const id = req.params.addressId;
    
    Address.findAll({ where: { id } })
      .then(address => {
        if(!address.length) {
          return res.json({ msg: 'Address not found'})
        }
        res.json({ app })
      })
      .catch(err => res.status(500).json({ err }));
  };
// update an address
const updateAddress = (req, res) => {
    let {
      address, 
        tls, 
        staging
    } = req.body;
    const id = req.params.addressId;
  
    Address.update(
      {
        address, 
        tls, 
        staging
      },
      { where: { id } }
    )
      .then(address => {
        caddy.updateCaddyApp(address)
        res.status(200).json({ address })
      })      
      .catch(err => res.status(500).json({ err }));
  };
// delete an address
const deleteAddress = (req, res) => {
    const id = req.params.addressId;
  
    Address.destroy({ where: { id } })
      .then(() => res.status(200).json({ msg: 'Address has been deleted successfully!' }))
      .catch(err => res.status(500).json({ msg: 'Failed to delete! ' + err }));
  };

  const caddyConfig = (req, res) => {
    caddy.getCaddyConfig().then(response => {
      //console.log(response.data)
      res.status(200).json(response.data);
    } 
    )
  };
  const caddyConfigTest = (req, res) => {
    caddy.addCaddyApp().then(response => {
      //console.log(response.data)
      res.status(200).json(response.data);
    } 
    )
  };
  export { 
    createAddress, 
    findAllAddresses, 
    findAddressById, 
    updateAddress, 
    deleteAddress,
    caddyConfig,
    caddyConfigTest
}