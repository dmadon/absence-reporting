const {Model,DataTypes} = require('sequelize');
const sequelize = require('../config/connection');


class Absence extends Model{}

Absence.init(
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        start_date:{
            type: DataTypes.DATEONLY,
            allowNull:false,
            validate:{
                isDate:true
            }
        },
        end_date:{
            type:DataTypes.DATEONLY,
            allowNull:false,
            validate:{
                isDate:true
            }
        },
        absence_hours:{
            type:DataTypes.DECIMAL(10,2),
            allowNull:false,
            validate:{
                min:0.15
            }
        },
        leave_type_id:{
            type:DataTypes.INTEGER,
            allowNull:true,
            // references:{
            //     model:'leave',
            //     key:'id'
            // },
        },
        status:{
            type:DataTypes.ENUM,
            allowNull:false,
            values:['pending','approved','denied'],
            defaultValue:'pending'
        },
        user_id:{
            type:DataTypes.INTEGER,
            references:{
                model:'user',
                key:'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName:true,
        underscored:true,
        modelName:'absence'
    }
);

module.exports = Absence;