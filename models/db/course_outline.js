/**
 * Created by 刘柘林 on 2018/3/16.
 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('course_outline', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        c_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        title:{
            type: DataTypes.STRING
        },
        f_name:{
            type: DataTypes.STRING
        }
    },{
        underscore: true,
        timestamps: false,
        freezeTableName: true
    })
};