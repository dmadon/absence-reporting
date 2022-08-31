const User = require('./User');
const Department = require('./Department');


Department.hasMany(User,{
    foreignKey:'department_id',
});

User.belongsTo(Department,{
    foreignKey: 'department_id',
    onDelete:'SET NULL'
});

User.hasMany(User,{as:'employees',foreignKey:'approver_id'});
User.belongsTo(User,{as:'approver',foreignKey:'approver_id'});



module.exports={User, Department};