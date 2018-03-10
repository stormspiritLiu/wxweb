/**
 * Created by 刘柘林 on 2018/3/7.
 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('teacher_remark', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        s_id: {
            type: DataTypes.INTEGER
        },
        t_id: {
            type: DataTypes.INTEGER
        },
        mark: {
            type: DataTypes.INTEGER,
            defaultValue: 5 //默认五星好评
        },
        information:{
            type: DataTypes.TEXT
        },
        create_time:{
            type: DataTypes.DATE
        }
    },{
        underscore: true,
        timestamps: false,
        freezeTableName: true
    })
};