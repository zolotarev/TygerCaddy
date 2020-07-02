export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      avatar: DataTypes.STRING,
      roles: {
        type: DataTypes.STRING,
        get: function() {
          const value = this.getDataValue('roles').split(';')
          return value
        },
        set: function(val) {
         // console.log(val)
          const newVal = val.join(';');
          //console.log(newVal)
          this.setDataValue('roles',newVal);
        }
      }
    },
    {}
  );

  User.prototype.toJSON = function() {
    var values = Object.assign({}, this.get());
    delete values.password;
    return values
  }
  User.associate = function(models) {
    // associations go here
  };

  return User;
};
