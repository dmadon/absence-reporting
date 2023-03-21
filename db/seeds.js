const db = require('../config/connection');
const bcrypt = require('bcrypt');

const seedUsers = async () => {

    const userSeeds = [
        {
            first_name: 'Deanna',
            last_name: 'Madon',
            is_approver: 1,
            is_admin: 1,
            department_id: 3,
            approver_id: null,
            email: 'deanna.madon@gmail.com',
            password: 'deanna'
        },
        {
            first_name: 'Chuck',
            last_name: 'Norris',
            is_approver: 1,
            is_admin: 1,
            department_id: 1,
            approver_id: 1,
            email: 'chuck@example.com',
            password: 'chuck'
        }
    ];

    const hashPasswords = userSeeds.map(
        async (userInfo) => {
            userInfo.password = await bcrypt.hash(userInfo.password,10)
            return userInfo;
        }
    );
        
    const updatedUsers = await Promise.all(hashPasswords); 
    
    const finalSeeds = updatedUsers.forEach ((user) => {      
        
        const sql = `INSERT INTO user 
        (first_name,last_name,is_approver,is_admin,department_id,approver_id,email,password)
        VALUES( ?,?,?,?,?,?,?,?);`

        const params = [
            user.first_name,
            user.last_name,
            user.is_approver,
            user.is_admin,
            user.department_id,
            user.approver_id,
            user.email,
            user.password
        ];
      
        return db.query(sql, {
            type: db.QueryTypes.INSERT,
            replacements: params
        });
    });
};

seedUsers();