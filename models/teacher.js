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
Teacher.findById = function (id) {
    return Teacher.findOne({
        where:{
            id:id
        }
    });
};
module.exports = Teacher;