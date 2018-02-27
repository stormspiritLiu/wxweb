/**
 * Created by 刘柘林 on 2018/2/26.
 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('resource', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        c_id: {
            type: DataTypes.INTEGER
        },
        name:{
            type: DataTypes.STRING
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