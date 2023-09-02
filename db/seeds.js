const db = require('../config/connection');
const bcrypt = require('bcrypt');
require('dotenv').config();

const seedDepartments = () => {
    const seeds = () => {
        const sql = `INSERT INTO department (name)
        VALUES
            ('Human Resources'),
            ('Purchasing'),
            ('Accounts Payable'),
            ('Wealth Management'),
            ('Customer Service');`
    
         
        return db.query(sql, {
            type: db.QueryTypes.INSERT
        });
    }
    seeds();
    console.log('Departments seeded!');
};

const seedLeaveTypes = () => {
    const seeds = () => {
        const sql = `INSERT INTO leave (leave_type)
        VALUES
            ('Vacation'),
            ('Personal Illness'),
            ('Family Illness'),
            ('Parental Leave'),
            ('Bereavement');`
    
         
        return db.query(sql, {
            type: db.QueryTypes.INSERT
        });
    }
    seeds();
    console.log('Leave Types seeded!');
};



const seedUsers = async () => {

    const userSeeds = [
        {
            first_name: 'Primary',
            last_name: 'Approver',
            is_approver: 1,
            is_admin: 1,
            department_id: 3,
            approver_id: null,
            email: process.env.SEED_APPROVER_EMAIL,
            password: process.env.SEED_APPROVER_PW
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
    console.log('Users seeded!');
};

seedDepartments();
// seedLeaveTypes();
seedUsers();