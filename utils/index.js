/**
 * Created by 刘柘林 on 2018/1/28.
 */

//session type字段：0为管理员，1为教师，2为学生
exports.studentLoginSession = function (req, res, student) {
    console.log("studentLoginSession");
    return req.session.student = {
        id: student.id,
        name: student.name,
        state: student.state,
        type: 2
    }
};

exports.studentLogoutSession = function (req) {
    console.log("studentLogoutSession");
    return delete req.session.student;
};

exports.teacherLoginSession = function (req, res, teacher) {
    console.log("teacherLoginSession");
    return req.session.teacher = {
        id: teacher.id,
        name: teacher.name,
        state: teacher.state,
        type: 1
    }
};

exports.teacherLogoutSession = function (req) {
    console.log("teacherLogoutSession");
    return delete req.session.teacher;
};

exports.adminLoginSession = function (req, res, admin) {
    return req.session.admin = {
        id: admin.id,
        name: admin.name,
        type: 0
    }
};

exports.teacherLogoutSession = function (req) {
    return delete req.session.admin;
};