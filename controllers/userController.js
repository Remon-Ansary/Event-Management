const db = require("../models")
const Sequelize = require("sequelize")
const Op = Sequelize.Op
const Users = db.users

const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll()

    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const addWorkshopIdtoUser = async (req, res) => {
  const { id } = req.params
  const { workshop_id } = req.body
  try {
    const user = await Users.findByPk(id)
    if (user) {
      await user.update({
        workshop_id,
      })

      res.status(200).json(user)
    } else {
      res.status(404).json({ message: "User not found" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getUsers,
  addWorkshopIdtoUser,
}
