const eventController = require("../controllers/eventController.js")
const workshopController = require("../controllers/workshopController.js")
const userController = require("../controllers/userController.js")
const router = require("express").Router()

router.post("/addEvent", eventController.addEvent)
router.get("/allEvent", eventController.getEvents)
router.get("/event/:id", eventController.getEventById)
router.get("/activeEvent", eventController.getActiveEvents)
router.get("/activeWorkshopEvent/:id", eventController.activeWorkshopOfEvent)

//workshop routes
router.post("/addWorkshop", workshopController.addWorkshop)
router.get("/allWorkshop", workshopController.getWorkshops)
router.get("/activeWorkshop", workshopController.getActiveWorkshops)
router.get("/workshop/:id", workshopController.getSingleWorkshop)
router.get("/workshop/:id/users", workshopController.getWorkshopUser)

//connect one to many relationship
router.get("/eventWorkshop/:id", eventController.getEventWorkshop)

//user routes
router.get("/allUser", userController.getUsers)

router.post("/addUserWorkshop/:id", userController.addWorkshopIdtoUser)
module.exports = router
