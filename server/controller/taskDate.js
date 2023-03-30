const { DataTypes } = require('sequelize')
const {sequelize} = require('../util/database')
const { User } = require('../models/user')

module.exports = {

    getUserTaskDate: async (req, res) => {

        try{
            
            const {userId} = req.params
    
            await User.findOne({where: {id: userId}})
            .then(user => {
                const date = user.taskDate
                res.status(200).send(`${date}`)
            })
    
    
    
        } catch(err){
            console.log(err)
            res.sendStatus(400)
        }
    
    },

    updateUserTaskDate: async (req, res) => {

        try{

             const today = new Date();
             const date = today.getDate();
             const month = today.getMonth() + 1; 
             const year = today.getFullYear();
            
            const {userId} = req.params
    
            const user = await User.findOne({where: {id: userId}})
            
            const updatedDate = await user.update({ taskDate: `${month}/${date}/${year}`})

    
            res.status(200).send(`${updatedDate.date}`)
    
    
        } catch(err){
            console.log(err)
            res.sendStatus(400)
        }
    
    }


}