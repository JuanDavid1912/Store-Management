const defineProduct = (sequelize, DataTypes) => {
    return sequelize.define('product',{
        id:{
            type:DataTypes.STRING,
            primaryKey:true,
            unique: true,
            allowNull:false
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        price:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        description:{
            type:DataTypes.STRING,
            allowNull:false
        },
        stock:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        id_store:{
          type: DataTypes.STRING,
          references: {
              model: 'store',
              key: 'id'
            }
        }
    },{
        tableName:'product',
        timestamps: true
    });
};

module.exports = defineProduct;