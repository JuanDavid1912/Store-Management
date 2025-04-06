const defineBill=(sequelize, DataTypes) => {
    return sequelize.define('Bill',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true,
            unique:true,                                   
            allowNull: false
        },
        products:{
            type:DataTypes.STRING,
            allowNull: true
        },
        total:{
            type:DataTypes.INTEGER,
            allowNull: true
        },
        id_store:{
            type: DataTypes.INTEGER,
            references: {
                model: 'store',
                key: 'id'
            }
        },
        id_client:{
            type: DataTypes.INTEGER,
            references: {
                model: 'client',
                key: 'id'
            }
        }
    },{
        tableName:'bill',
        timestamps: true
    });
};


module.exports = defineBill;