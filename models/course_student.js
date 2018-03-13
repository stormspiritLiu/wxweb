/**
 * Created by 刘柘林 on 2018/3/13.
 */
var Course_Student = require('./db')['course_student'];

Course_Student.findBySId = function (s_id) {
    return Course_Student.findAll({
        where:{
            s_id : s_id
        }
    });
};

module.exports = Course_Student;