/**
 * Created by 刘柘林 on 2018/2/6.
 */
var Course = require('./db')['course'];

Course.findById = function (id) {
    return Course.findOne({
        where:{
            id:id
        }
    });
};

//通过年级科目查找课程
Course.findByTwo = function (category, grade) {
    if(category == "全部"){
        if(grade == "全部"){
            return Course.findAll();
        }else{
            return Course.findAll({
                where: {
                    grade: grade
                }
            });
        }
    }else{
        if(grade == "全部"){
            return Course.findAll({
                where: {
                    category: category
                }
            });
        }else{
            return Course.findAll({
                where: {
                    '$and': [
                        {category: category},
                        {grade: grade}
                    ]
                }
            });
        }
    }

};

module.exports = Course;