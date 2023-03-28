require("dotenv").config();

const { SECRET } = process.env;

const { User } = require("../models/user");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const createToken = (username, id) => {
  return jwt.sign({ username, id }, SECRET, { expiresIn: "2 days" });
};

module.exports = {

  register: async (req, res) => {

    try {
      const { username, password } = req.body;

      if(password.length === 0) {
        res.status(400).send("Please enter a password")
        return
      }

      if(password.length < 4) {
        res.status(400).send("Password must be at least 4 characters long")
        return
      }

      if(username.length < 4) {
        res.status(400).send("Username must be at least 4 characters long")
        return
      }

      let foundUser = await User.findOne({ where: { username } });

      if (foundUser) {
        res.status(400).send("This username is already in use");
      } else {

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = await User.create({
            username,
            hashedPass: hash,
        })

        const token = createToken(newUser.username, newUser.id)

        const exp = Date.now() + 1000 * 60 * 60 * 48

        res.status(200).send({
            username: newUser.username,
            userId: newUser.id,
            token,
            exp
        })

      }
    } catch (err) {
        console.log(err)
        res.status(400).send("Error in the register function");
    }

    
  },

  login: async (req, res) => {
    
    try{

        const { username, password } = req.body

        if(password.length === 0) {
          res.status(400).send("Please enter a password")
          return
        }
  
        if(password.length < 4) {
          res.status(400).send("Password must be at least 4 characters long")
          return
        }
  
        if(username.length < 4) {
          res.status(400).send("Username must be at least 4 characters long")
          return
        }

        let foundUser = await User.findOne({ where: { username } })


        if(foundUser){

            const isAuthenticated = bcrypt.compareSync(password, foundUser.hashedPass)
            if(isAuthenticated){

                const token = createToken(foundUser.username, foundUser.id)
                const exp = Date.now() + 1000 * 60 * 60 * 48

                res.status(200).send({
                    username: foundUser.username,
                    userId: foundUser.id,
                    token,
                    exp,
                    points: foundUser.points
                })

            } else {
                res.status(400).send('Password is incorrect')
            }

        } else {
            res.status(400).send('That username does not exist')
        }


    } catch(err){
        console.log(err)
        res.status(400).send('Error in the login function')
    }

  },
};
