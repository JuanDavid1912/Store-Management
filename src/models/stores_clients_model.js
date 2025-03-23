const defineStoresClients = (sequelize, DataTypes) =>{
    return sequelize.define('storeclients',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoincrement:true,
        },
        id_store:{
            type:DataTypes.INTEGER,
            references:{
                model:'store',
                key:'id'
            }
        },
        id_client:{
            type:DataTypes.STRING,
            references:{
                model:'client',
                key:'id'
            }
        }
    },{
        tableName:'storesclients',
        timestamps: true
    });
};
module.exports = defineStoresClients;
