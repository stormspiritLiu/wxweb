/**
 * Created by 刘柘林 on 2018/1/27.
 */
var Teacher = require('./db')['teacher'];

Teacher.findByAccount = function (account) {
    return Teacher.findOne({
        where:{
            account:account
        }
    });
};

module.exports = Teacher;