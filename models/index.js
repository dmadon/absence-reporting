const User = require('./User');
const Department = require('./Department');
const Absence = require('./Absence');
const Leave = require('./Leave');


Department.hasMany(User,{
    foreignKey:'department_id',
});

User.belongsTo(Department,{
    foreignKey: 'department_id',
    onDelete:'SET NULL'
});

User.hasMany(User,{as:'employees',foreignKey:'approver_id'});
User.belongsTo(User,{as:'approver',foreignKey:'approver_id'});

User.hasMany(Absence,{
    foreignKey:'user_id',
});

Absence.belongsTo(User,{
    foreignKey:'user_id',
    onDelete:'CASCADE'
});

Leave.hasMany(Absence,{
    foreignKey:'leave_type_id'
});

Absence.belongsTo(Leave,{
    foreignKey:'leave_type_id',
    onDelete:'SET NULL'
})



module.exports = {User, Department, Absence, Leave}; 