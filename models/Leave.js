const {Model,DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Leave extends Model{}

Leave.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey:true
        },
        leave_type:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        }
    },
    {
        sequelize,
        freezeTableName:true,
        underscored:true,
        timestamps:false,
        modelName:'leave'
    }
)



module.exports = Leave;