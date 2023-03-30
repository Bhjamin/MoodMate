const { DataTypes } = require('sequelize')
const { sequelize } = require('../util/database')

module.exports = {

    User: sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username: DataTypes.STRING,
        hashedPass: DataTypes.STRING,
        points: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
          },
        date: DataTypes.STRING,
        taskDate: DataTypes.STRING
    }),

    Entries: sequelize.define('entries', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        question1: DataTypes.STRING,
        answer1: DataTypes.STRING,
        question2: DataTypes.STRING,
        answer2: DataTypes.STRING,
        question3: DataTypes.STRING,
        answer3: DataTypes.STRING,
        date: DataTypes.STRING,
        emotion: DataTypes.STRING
    }),

}