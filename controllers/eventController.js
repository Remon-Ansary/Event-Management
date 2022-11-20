const db = require("../models")
const Sequelize = require("sequelize")
const Op = Sequelize.Op
//main model
const Event = db.events
const Workshop = db.workshops

//main working

//create event

const addEvent = async (req, res) => {
  const { title, start_at, end_at } = req.body
  try {
    const event = await Event.create({
      title,
      start_at,
      end_at,
    })
    res.status(201).json(event)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//get all events
const getEvents = async (req, res) => {
  try {
    const events = await Event.findAll()
    res.status(200).json(events)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//get event by id
const getEventById = async (req, res) => {
  const { id } = req.params
  try {
    const event = await Event.findByPk(id)
    res.status(200).json(event)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//update event
const updateEvent = async (req, res) => {
  const { id } = req.params
  const { title, start_at, end_at } = req.body
  try {
    const event = await Event.findByPk(id)
    if (event) {
      await event.update({
        title,
        start_at,
        end_at,
      })
      res.status(200).json(event)
    } else {
      res.status(404).json({ message: "Event not found" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getActiveEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      where: {
        end_at: {
          [Op.gt]: new Date(),
        },
      },
    })
    res.status(200).json(events)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//connect one to many relationship
const getEventWorkshop = async (req, res) => {
  const { id } = req.params

  try {
    const event = await Event.findByPk(id, {
      include: [
        {
          model: Workshop,
          as: "workshop",
        },
      ],
    })
    res.status(200).json(event)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//connect one
const activeWorkshopOfEvent = async (req, res) => {
  const { id } = req.params
  try {
    const event = await Event.findByPk(id, {
      include: [
        {
          model: Workshop,
          as: "workshop",
          where: {
            end_at: {
              [Op.gt]: new Date(),
            },
          },
        },
      ],
    })
    res.status(200).json(event)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  addEvent,
  getEvents,
  getEventById,
  updateEvent,
  getEventWorkshop,
  getActiveEvents,
  activeWorkshopOfEvent,
}
