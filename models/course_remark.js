/**
 * Created by 刘柘林 on 2018/2/26.
 */
var Course_Remark = require('./db')['course_remark'];

Course_Remark.findByCId = function (c_id) {
    return Course_Remark.findAll({
        where:{
            c_id : c_id
        }
    });
};

module.exports = Course_Remark;