import passport from 'passport';
import config from '../config/config';
import { allowOnly } from '../services/routesHelper';
import { findConfigById, updateConfig, findAllConfig
} from '../controllers/configuration';

module.exports = (app) => {
  //retrieve config
  app.get(
    '/api/configuration', 
    passport.authenticate('jwt', { 
      session: false 
    }),
    allowOnly(config.accessLevels.superAdmin, findConfigById)
  );

    // update config
  /*app.put(
    '/api/config',
    passport.authenticate('jwt', {
      session: false,
    }),
    allowOnly(config.accessLevels.admin, updateConfig)
  );*/
};
