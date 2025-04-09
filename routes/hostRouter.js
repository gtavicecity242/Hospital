// External Module
const express = require("express");
const hostRouter = express.Router();

// Local Module
const hostController = require("../controllers/hostController");

hostRouter.get("/add-doctor", hostController.getAddHome);
hostRouter.post("/add-doctor", hostController.postAddHome);
hostRouter.get("/host-dr-list", hostController.getHostHomes);
hostRouter.get("/edit-doctor/:homeId", hostController.getEditHome);
hostRouter.post("/edit-home", hostController.postEditHome);
hostRouter.post("/delete-doctor/:homeId", hostController.postDeleteHome);

module.exports = hostRouter;
