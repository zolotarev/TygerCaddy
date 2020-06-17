export default (sequelize, DataTypes) => {
    const App = sequelize.define(
      'App',
      {
        name: DataTypes.STRING,
        url: DataTypes.STRING,
        verify_ssl: DataTypes.BOOLEAN,
        websocket: DataTypes.BOOLEAN,
        transparent: DataTypes.BOOLEAN,
      },
      {}
    );
  
    App.associate = function(models) {
      // associations go here
    };
  
    return App;
  };