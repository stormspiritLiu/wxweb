/**
 * Created by 刘柘林 on 2018/1/26.
 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('student', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        account: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        school:{
            type: DataTypes.STRING,
            allowNull: false
        },
        grade:{
            type: DataTypes.STRING,
            allowNull: false
        },
        class:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        state:{
            type: DataTypes.INTEGER
        },
        information:{
            type: DataTypes.TEXT
        },
        access_type:{
            type: DataTypes.INTEGER
        },
        access_id:{
            type: DataTypes.INTEGER
        }
    },{
        underscore: true,
        timestamps: false,
        freezeTableName: true
    })
};