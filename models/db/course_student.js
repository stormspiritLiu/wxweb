/**
 * Created by 刘柘林 on 2018/3/13.
 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('course_student', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        s_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        c_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        state:{
            type: DataTypes.INTEGER,
        },
        mark: {
            type: DataTypes.INTEGER
        },
        information:{
            type: DataTypes.TEXT
        },
        update_time:{
            type: DataTypes.TIME
        }
    },{
        underscore: true,
        timestamps: false,
        freezeTableName: true
    })
};