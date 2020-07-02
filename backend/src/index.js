import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import cors from 'cors';
import models from './models';
import db from './models';
const User = db.User;
var Admin = require('./services/firstRunService');

const app = express();

app.use(bodyParser.json());

let port = process.env.PORT || 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));


// const corsOptions = {
//   origin: 'http://localhost:8081',
//   optionsSuccessStatus: 200,
// };

// app.use(cors(corsOptions));
app.use(cors());

// force: true will drop the table if it already exits
// models.sequelize.sync({ force: true }).then(() => {
models.sequelize.sync().then(() => {
  console.log('Drop and Resync with {force: true}');
  var admin = new Admin();
  //Create admin user if it does not exist
  admin.check();
  admin.caddyConfig();
  var caddystatus = async ()=> {
    var result = await admin.checkCaddyStatus();
    if (result) {
      //console.log(result)
      //Apply initial Caddy Config
      var apply = await admin.applyCaddyConfig();
      if (apply){
       // console.log("Caddy config applied, Caddy is ready to serve.")
      }else{
        //console.log("Caddy is Broken!")
      }
    } else {
      //console.log(result)
    }
  }
  caddystatus();
});



// passport middleware
app.use(passport.initialize());

// passport config
require('./config/passport')(passport);

//default route
app.get('/', (req, res) => res.send('<h1>TygerNode Server is running</h1>'));
require('./routes/configuration.js')(app);
require('./routes/user.js')(app);
require('./routes/app.js')(app);
require('./routes/address.js')(app);

//create a server
var server = app.listen(port, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);

});
