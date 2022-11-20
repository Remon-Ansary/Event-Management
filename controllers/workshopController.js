const db = require("../models")
const Sequelize = require("sequelize")
const Op = Sequelize.Op
const Workshop = db.workshops

const addWorkshop = async (req, res) => {
  const { title, start_at, end_at, description } = req.body
  try {
    const workshop = await Workshop.create({
      title,
      start_at,
      end_at,
      description,
    })
    res.status(201).json(workshop)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getWorkshops = async (req, res) => {
  try {
    const workshops = await Workshop.findAll()
    res.status(200).json(workshops)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const getSingleWorkshop = async (req, res) => {
  const { id } = req.params
  try {
    const workshop = await Workshop.findByPk(id)
    res.status(200).json(workshop)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getActiveWorkshops = async (req, res) => {
  try {
    const workshops = await Workshop.findAll({
      where: {
        end_at: {
          [Op.gt]: new Date(),
        },
      },
    })
    res.status(200).json(workshops)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getWorkshopUser = async (req, res) => {
  const { id } = req.params
  try {
    const workshop = await Workshop.findByPk(id, {
      include: [
        {
          model: db.users,
          as: "user",
          attributes: ["id", "name", "email"],
        },
        {
          model: db.events,
          as: "event",
          attributes: ["id", "title", "start_at", "end_at"],
        },
      ],
    })
    res.status(200).json(workshop)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  addWorkshop,
  getWorkshops,
  getActiveWorkshops,
  getSingleWorkshop,
  getWorkshopUser,
}
