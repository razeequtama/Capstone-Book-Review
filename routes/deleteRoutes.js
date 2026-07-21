import express from "express";
import deleteController from "../controller/deleteController.js";

const deleteRouter = express.Router();

deleteRouter.get("/:id", deleteController);

export default deleteRouter;