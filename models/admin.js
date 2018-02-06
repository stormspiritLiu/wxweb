/**
 * Created by 刘柘林 on 2018/1/26.
 */
var Admin = require('./db')['admin'];

Admin.findByAccount = function (account) {
    return Admin.findOne({
        where:{
            account:account
        }
    });
};

module.exports = Admin;