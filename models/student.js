/**
 * Created by 刘柘林 on 2018/1/26.
 */
var Student = require('./db')['student'];

Student.findByAccount = function (account) {
    return Student.findOne({
        where:{
            account:account
        }
    });
};

module.exports = Student;