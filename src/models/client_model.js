const defineClient = (Sequelize,DataTypes) => {
    return Sequelize.define('Client',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull:false,
            unique:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false
        },
        email:{
            type:DataTypes.STRING,
            allowNull: false,
            unique:true
        },
        phone:{
            type:DataTypes.STRING,
            allowNull: false,
            unique:true
        }

    },{
        tableName:'client',
        timestamps: true
    });
};
module.exports=defineClient;