/**
 * Created by 刘柘林 on 2018/5/7.
 */
var Live = require('./db')['live'];

Live.findById = function (id) {
    return Live.findOne({
        where:{
            id:id
        }
    });
};

module.exports = Live;