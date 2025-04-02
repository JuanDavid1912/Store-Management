const definePurchaseClient = (sequelize,DataTypes) => {
    return sequelize.define('Purchaseclient',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        id_bill:{                                                
            type: DataTypes.INTEGER,
            references:{
                model:'bill',
                key:'id'
            }
        },
        id_client:{
            type: DataTypes.STRING,
            references:{
                model:'client',
                key:'id'
            }
        },
        id_product:{
            type:DataTypes.STRING,
            references:{
                model:'product',
                key:'id'
            }
        },
        quantity:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        total:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    },{
        tableName:'purchaseclient',
        timestamps:true
    });
};

module.exports = definePurchaseClient;