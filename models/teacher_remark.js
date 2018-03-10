/**
 * Created by 刘柘林 on 2018/3/7.
 */
var Teacher_Remark = require('./db')['teacher_remark'];

Teacher_Remark.findByTId = function (t_id) {
    return Teacher_Remark.findAll({
        where:{
            t_id : t_id
        }
    });
};

module.exports = Teacher_Remark;