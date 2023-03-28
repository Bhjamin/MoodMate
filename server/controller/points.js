const { DataTypes } = require('sequelize')
const {sequelize} = require('../util/database')
const { User } = require('../models/user')

module.exports = {

getUserPoints: async (req, res) => {

    try{
        
        const {userId} = req.params

        await User.findOne({where: {id: userId}})
        .then(user => {
            const points = user.points
            res.status(200).send(`${points}`)
        })



    } catch(err){
        console.log(err)
        res.sendStatus(400)
    }

},

updateUserPoints: async (req, res) => {

    try{
        
        const {userId} = req.params

        const user = await User.findOne({where: {id: userId}})
        
        const updatedPoints = await user.update({ points: user.points + 1})

        res.status(200).send(`${updatedPoints.points}`)


    } catch(err){
        console.log(err)
        res.sendStatus(400)
    }

}

}