const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/database");
const { Entries } = require("../models/user");

module.exports = {
  addEntry: async (req, res) => {
    try {
      const { emo, q1, q2, q3, a1, a2, a3, date } = req.body;

      const { userId } = req.params;

      const newEntry = await Entries.create({
        userId: userId,
        question1: q1,
        answer1: a1,
        question2: q2,
        answer2: a2,
        question3: q3,
        answer3: a3,
        date: date,
        emotion: emo,
      });

      res.status(200).send(newEntry);
    } catch (err) {
      console.log(err);
    }
  },

  getEntries: async (req, res) => {
    try {
      const { userId } = req.params;

      await Entries.findAll({ where: { userId: userId } }).then((entries) => {
        res.status(200).send(entries);
      });
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },
};
