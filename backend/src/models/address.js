
export default (sequelize, DataTypes) => {
    const Address = sequelize.define(
      'Address',
      {
        address: DataTypes.STRING,
        tls: DataTypes.BOOLEAN,
        staging: DataTypes.BOOLEAN,
      },
    );
  
    Address.associate = function(models) {
      // associations go here
      Address.belongsTo(models.App);
    };
    
    return Address;
  };