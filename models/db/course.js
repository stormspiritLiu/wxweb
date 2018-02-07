/**
 * Created by 刘柘林 on 2018/2/6.
 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('course', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        t_id: {
            type: DataTypes.INTEGER
        },
        category: {
            type: DataTypes.STRING
        },
        grade:{
            type: DataTypes.STRING
        },
        title:{
            type: DataTypes.STRING
        },
        information:{
            type: DataTypes.TEXT
        },
        participants:{
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        hot:{
            type: DataTypes.DOUBLE
        },
        mark:{
            type: DataTypes.DOUBLE,
            defaultValue: 5.0
        }
    },{
        underscore: true,
        timestamps: false,
        freezeTableName: true
    })
};