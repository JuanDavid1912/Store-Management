const defineBill=(sequelize, DataTypes) => {
    return sequelize.define('Bill',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true,
            unique:true,
            allowNull: false
        },
        productos:{
            type:DataTypes.STRING
        },
        total:{
            type:DataTypes.INTEGER
        },
        date:{
            type: DataTypes.DATE
        }
    },{
        tableName:'bill',
        timestamps: true
    });
};
module.exports = defineBill;