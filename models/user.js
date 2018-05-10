/* jshint indent: 2 */
var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    email_address: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp')
    },
    active: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
    }
  },
  {
    instanceMethods: {
      validPassword: function(password, passwd, done, user){
        bcrypt.compare(password, passwd, function(err, isMatch){
          if(err) console.log(err);
          if(isMatch) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      }
    }
  },
  {
    dialect: 'mysql'
  }
);
  User.beforeCreate(function (user, options) {
    return cryptPassword(user.password)
      .then(success => {
        user.password = success;
      })
      .catch(err => {
        if (err) console.log(err);
      });
  });

  function cryptPassword(password) {
    console.log("cryptPassword" + password);
    return new Promise(function (resolve, reject) {
      bcrypt.genSalt(10, function (err, salt) {
        // Encrypt password using bycrpt module
        if (err) return reject(err);

        bcrypt.hash(password, salt, null, function (err, hash) {
          if (err) return reject(err);
          return resolve(hash);
        });
      });
    });
  }
return User
};
