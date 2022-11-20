module.exports = (sequelize, DataTypes) => {
  const Workshop = sequelize.define("workshop", {
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
    description: {
      type: DataTypes.STRING,
    },
  })
  return Workshop
}
