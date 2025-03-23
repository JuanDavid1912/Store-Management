const defineStore = (Sequelize, DataTypes) => {
    return Sequelize.define('store',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement:true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        address:{
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
        },
        phone:{
            type: DataTypes.INTEGER,
            allowNull: false,
            unique:true
        }
    },{
        tableName: 'store',
        timestamps: true
    });
};

module.exports = defineStore;
