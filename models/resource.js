/**
 * Created by 刘柘林 on 2018/2/26.
 */
var Resource = require('./db')['resource'];

Resource.findByCId = function (c_id) {
    return Resource.findAll({
        where:{
            c_id : c_id
        }
    });
};

module.exports = Resource;