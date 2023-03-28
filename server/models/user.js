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
        date: DataTypes.INTEGER
    }),

    Entries: sequelize.define('entries', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        question: DataTypes.STRING,
        answer: DataTypes.STRING,
        date: DataTypes.INTEGER,
        emotion: DataTypes.STRING
    }),

}