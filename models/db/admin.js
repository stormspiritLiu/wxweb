module.exports = function(sequelize, DataTypes) {
    return sequelize.define('admin', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING
        },
        account: {
            type: DataTypes.STRING
        }
    },{
        underscore: true,
        timestamps: false,
        freezeTableName: true
    })
};
