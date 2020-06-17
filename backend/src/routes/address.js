import passport from 'passport';
import config from '../config/config';
import { allowOnly } from '../services/routesHelper';
import { createAddress, findAddressById, updateAddress, deleteAddress, findAllAddresses, caddyConfig, caddyConfigTest
} from '../controllers/address';

module.exports = (app) => {
  // create a new address
  app.post(
    '/api/addresses',
    passport.authenticate('jwt', { session: false }),
    allowOnly(config.accessLevels.admin, createAddress)
  );

  //retrieve all addresses
  app.get(
    '/api/addresses', 
    passport.authenticate('jwt', { 
      session: false 
    }),
    allowOnly(config.accessLevels.admin, findAllAddresses)
  );

  // retrieve address by id
  app.get(
    '/api/address/:addressId',
    passport.authenticate('jwt', {
      session: false,
    }),
    allowOnly(config.accessLevels.admin, findAddressById)
  );

  // update an address with id
  app.put(
    '/api/addresses/:addressId',
    passport.authenticate('jwt', {
      session: false,
    }),
    allowOnly(config.accessLevels.admin, updateAddress)
  );

  // delete an address
  app.delete(
    '/api/addresses/:addressId',
    passport.authenticate('jwt', {
      session: false,
    }),
    allowOnly(config.accessLevels.admin, deleteAddress)
  );
  app.get(
    '/api/config',
    passport.authenticate('jwt', {
      session: false,
    }), 
    allowOnly(config.accessLevels.admin, caddyConfig)
  );
  app.get(
    '/api/config/test',
    passport.authenticate('jwt', {
      session: false,
    }), 
    allowOnly(config.accessLevels.admin, caddyConfigTest)
  );
};
