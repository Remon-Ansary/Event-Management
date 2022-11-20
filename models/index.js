const dbConfig = require("../config/dbConfig.js")

const { Sequelize, DataTypes } = require("sequelize")
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
})
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.")
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err)
  })

const db = {}
db.Sequelize = Sequelize
db.Sequelize = sequelize

db.events = require("./event.model.js")(sequelize, DataTypes)
db.workshops = require("./workshop.model.js")(sequelize, DataTypes)
db.users = require("./user.model.js")(sequelize, DataTypes)
db.Sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.")
})
// 1 to many relationship
db.events.hasMany(db.workshops, {
  as: "workshop",
  foreignKey: "event_id",
  sourceKey: "id",
})
db.workshops.belongsTo(db.events, {
  as: "event",
  foreignKey: "event_id",
  targetKey: "id",
})
db.workshops.hasMany(db.users, {
  as: "user",
  foreignKey: "workshop_id",
  sourceKey: "id",
})
db.users.belongsTo(db.workshops, {
  as: "workshop",
  foreignKey: "workshop_id",
  targetKey: "id",
})

module.exports = db
