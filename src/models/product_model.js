const defineProduct = (sequelize, DataTypes) => {
    return sequelize.define('Product',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            unique: true,
            allowNull:false,
            autoincrement:true
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
          type: DataTypes.INTEGER,
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