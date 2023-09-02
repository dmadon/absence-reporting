const {Model,DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');


class User extends Model {
    checkPassword(loginPw){
        return bcrypt.compareSync(loginPw,this.password)
    }
}

// TABLE COLUMNS:

User.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        first_name:{
            type: DataTypes.STRING,
            allowNull:false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        is_approver:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue:false
        },
        is_admin:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false
        },
        department_id:{
            type:DataTypes.INTEGER,
            allowNull:true,
            references:{
                model:'department',
                key:'id'
            }
        },
        approver_id:{
            type:DataTypes.INTEGER,
            allowNull:true,
            references:{
                model:'user',
                key:'id',
            }
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate:{
                isEmail: true
            }
        },
        password:{
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                len:[4]
            },
            defaultValue:'admin'
        }
    },
    {
        hooks:{
            async beforeCreate(newUserData){
                newUserData.password = await bcrypt.hash(newUserData.password,10);
                return newUserData;
            },
            async beforeUpdate(updatedUserData){
                updatedUserData.password = await bcrypt.hash(updatedUserData.password,10);
            }
        },
        sequelize,
        freezeTableName:true,
        underscored:true,
        timestamps:false,
        modelName:'user'        
    }
);

module.exports = User;