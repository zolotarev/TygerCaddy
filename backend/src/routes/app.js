import passport from 'passport';
import config from '../config/config';
import { allowOnly } from '../services/routesHelper';
import { createApp, findAppById, updateApp, deleteApp, findAllApps
} from '../controllers/app';

module.exports = (app) => {
  // create a new app
  app.post(
    '/api/apps',
    passport.authenticate('jwt', { session: false }),
    allowOnly(config.accessLevels.admin, createApp)
  );

  //retrieve all apps
  app.get(
    '/api/apps', 
    passport.authenticate('jwt', { 
      session: false 
    }),
    allowOnly(config.accessLevels.admin, findAllApps)
  );

  // retrieve app by id
  app.get(
    '/api/apps/:appId',
    passport.authenticate('jwt', {
      session: false,
    }),
    allowOnly(config.accessLevels.admin, findAppById)
  );

  // update a app with id
  app.put(
    '/api/apps/:appId',
    passport.authenticate('jwt', {
      session: false,
    }),
    allowOnly(config.accessLevels.admin, updateApp)
  );

  // delete an app
  app.delete(
    '/api/apps/:appId',
    passport.authenticate('jwt', {
      session: false,
    }),
    allowOnly(config.accessLevels.admin, deleteApp)
  );

};
