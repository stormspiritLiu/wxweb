/**
 * Created by 刘柘林 on 2018/5/7.
 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('live', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        t_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title:{
            type: DataTypes.STRING
        },
        category: {
            type: DataTypes.STRING
        },
        grade:{
            type: DataTypes.STRING
        },
        start_time:{
            type: DataTypes.DATE
        },
        length:{
            type: DataTypes.DOUBLE
        },
        state:{
            //1为未开始，2为正在进行，3为已结束
            type: DataTypes.INTEGER,
        },
        participants:{
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        information:{
            type: DataTypes.TEXT
        }
    },{
        underscore: true,
        timestamps: false,
        freezeTableName: true
    })
};