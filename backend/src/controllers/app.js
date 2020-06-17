import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import db from '../models';
const App = db.App;
// load input validation
import validateAppForm from '../validation/app/app.validation';

// create app
const createApp = (req, res) => {
    const { errors, isValid } = validateAppForm(req.body);
    let { 
        name, 
        url, 
        verify_ssl, 
        transparent,
        websocket,
    } = req.body;
  
    //check validation
    if(!isValid) {
      return res.status(400).json(errors);
    }
  
    App.findAll({ where: { name } }).then(app => {
      if (app.length) {
        return res.status(400).json({ name: 'App already exists!' });
      } else {
        let newApp = { 
          name, 
          url, 
          verify_ssl, 
          transparent,
          websocket 
        };
            App.create(newApp)
              .then(app => {

                res.json({ app });
              })
              .catch(err => {
                res.status(500).json({ err });
              });
      }
    });
  };
  // fetch all apps
const findAllApps = (req, res) => {
    App.findAll()
      .then(apps => {
        res.json({ apps });
      })
      .catch(err => res.status(500).json({ err }));
  };

  // fetch app by appId
const findAppById = (req, res) => {
    const id = req.params.appId;
    
    App.findAll({ where: { id } })
      .then(app => {
        if(!app.length) {
          return res.json({ msg: 'app not found'})
        }
        res.json({ app })
      })
      .catch(err => res.status(500).json({ err }));
  };
// update an app
const updateApp = (req, res) => {
    let {
        name, 
        url, 
        verify_ssl, 
        transparent,
        websocket,
    } = req.body;
    const id = req.params.appId;
  
    App.update(
      {
        name, 
        url, 
        verify_ssl, 
        transparent,
        websocket,
      },
      { where: { id } }
    )
      .then(app => res.status(200).json({ app }))
      .catch(err => res.status(500).json({ err }));
  };
// delete an app
const deleteApp = (req, res) => {
    const id = req.params.appId;
  
    App.destroy({ where: { id } })
      .then(() => res.status(200).json({ msg: 'App has been deleted successfully!' }))
      .catch(err => res.status(500).json({ msg: 'Failed to delete! ' + err }));
  };

  export { 
    createApp, 
    findAllApps, 
    findAppById, 
    updateApp, 
    deleteApp 
}