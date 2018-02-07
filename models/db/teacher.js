/**
 * Created by 刘柘林 on 2018/1/26.
 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('teacher', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        account: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        category:{
            type: DataTypes.STRING
        },
        grade:{
            type: DataTypes.STRING
        },
        name:{
            type: DataTypes.STRING
        },
        information:{
            type: DataTypes.TEXT
        },
        teaching_age:{
            type: DataTypes.INTEGER
        },
        mark:{
            type: DataTypes.DOUBLE
        },
        hot:{
            type: DataTypes.DOUBLE
        },
        state:{
            type: DataTypes.INTEGER
        },
    },{
        underscore: true,
        timestamps: false,
        freezeTableName: true
    })
};