import express from "express";
import editReview from "../controller/editController.js";

const editRouter = express.Router();

editRouter.get("/:id", editReview);

export default editRouter;