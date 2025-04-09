// External Module
const express = require("express");
const staffRouter = express.Router();

// Local Module
const staffController = require("../controllers/staffController");

staffRouter.get("/", staffController.getIndex);
staffRouter.get("/ourstaff", staffController.getstaff);

staffRouter.get("/staff", staffController.staff);
staffRouter.get("/facilities", staffController.getFacilities);
staffRouter.get("/Appointments", staffController.Appointments);

staffRouter.get("/staff/:homeId", staffController.getHomeDetails);
staffRouter.post("/Appointments", staffController.postAddToFavourite);
staffRouter.post("/Appointments/delete/:homeId", staffController.postRemoveFromFavourite);

module.exports = staffRouter;
