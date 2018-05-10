const express         = require('express');
const app             = express();
const passport        = require('passport');
const passportConfig  = require('./config/passport')
const session         = require('express-session');
const cookieParser    = require("cookie-parser");
const bodyParser      = require('body-parser');
const db              = require('./models');
// const apiRoutes     = require('./routes/apiRoutes');
const PORT            = process.env.PORT || 3000;

SALT_WORK_FACTOR = 12;

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const homeRoute = require('./routes/home');
const inventoryRoute = require('./routes/inventory');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

app.use(express.static(__dirname + '/app/public'));
app.use(cookieParser());
app.use(
  session({
    secret: "its a secret",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

// apiRoutes(app, db);

app.use('/', homeRoute);
app.use('/auth', authRoute);
app.use('/user', userRoute);

db.sequelize.sync().then(function (){
  db.user.find({where: {first_name: 'admin1'}}).then(function (foundUser){
    if(!foundUser){
      db.user.build({first_name: 'admin1', password: 'admin', email_address: 'test1@test.com', last_name: 'nimda'}).save();
    }
  })
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
  });
});

