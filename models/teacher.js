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

//通过年级科目查找老师
Teacher.findByTwo = function (category, grade) {
    if(category == "全部"){
        if(grade == "全部"){
            return Teacher.findAll({
                where:{
                    state: 1
                }
            });
        }else{
            return Teacher.findAll({
                where: {
                    '$and': [
                        {grade: grade},
                        {state: 1}
                    ]
                }
            });
        }
    }else{
        if(grade == "全部"){
            return Teacher.findAll({
                where: {
                    '$and': [
                        {category: category},
                        {state: 1}
                    ]
                }
            });
        }else{
            return Teacher.findAll({
                where: {
                    '$and': [
                        {category: category},
                        {grade: grade},
                        {state: 1}
                    ]
                }
            });
        }
    }

};

module.exports = Teacher;