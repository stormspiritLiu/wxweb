/**
 * Created by 刘柘林 on 2018/1/26.
 */
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var config = require('../../config/config.json').development;

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host, // 数据库地址
    port: config.port,
    dialect: config.dialect, // 指定连接的数据库类型
    pool: {
        max: 5, // 连接池中最大连接数量
        min: 0, // 连接池中最小连接数量
        idle: 10000 // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
    }
});

var basename  = path.basename(module.filename);
var db = {};

fs.readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;