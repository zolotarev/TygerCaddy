export default (sequelize, DataTypes) => {
    const Configuration = sequelize.define(
      'Configuration',
      {
        server_name: DataTypes.STRING,
        automatic_https: DataTypes.BOOLEAN,
        redirect_https: DataTypes.BOOLEAN,
        persist: DataTypes.BOOLEAN,
        disabled: DataTypes.BOOLEAN,
        enforce_origin: DataTypes.BOOLEAN,
        listen: DataTypes.STRING,
        origins: DataTypes.JSONB,
        external_address: DataTypes.STRING,
        external_port: DataTypes.STRING,
        use_dns_verification: DataTypes.BOOLEAN,
        dns_provider_name: DataTypes.STRING,
        dns_api_token: DataTypes.STRING
      },
    );
  
    Configuration.associate = function(models) {
      // associations go here
    };
  
    return Configuration;
  };