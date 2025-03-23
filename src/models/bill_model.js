const defineBill=(sequelize, DataTypes) => {
    return sequelize.define('bill',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true,
            unique:true,
            allowNull: false
        },
        productos:{
            type:DataTypes.JSON
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