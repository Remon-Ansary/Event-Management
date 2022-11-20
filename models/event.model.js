module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define("event", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
    },

    start_at: {
      type: DataTypes.DATE,
    },
    end_at: {
      type: DataTypes.DATE,
    },
  })

  return Event
}
