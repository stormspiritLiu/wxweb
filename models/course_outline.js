var Course_Outline = require('./db')['course_outline'];

Course_Outline.findByCId = function (c_id) {
    return Course_Outline.findAll({
        where:{
            c_id : c_id
        }
    });
};

module.exports = Course_Outline;