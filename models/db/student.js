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
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        school:{
            type: DataTypes.STRING
        },
        grade:{
            type: DataTypes.STRING
        },
        name:{
            type: DataTypes.STRING
        },
        state:{
            type: DataTypes.INTEGER
        },
        information:{
            type: DataTypes.TEXT('long')
        }
    },{
        underscore: true,
        timestamps: false,
        freezeTableName: true
    })
};