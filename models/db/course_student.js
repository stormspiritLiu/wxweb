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
        }
    },{
        underscore: true,
        timestamps: false,
        freezeTableName: true
    })
};