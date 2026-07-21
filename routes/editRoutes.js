import express from "express";
import {editReview, editReviewConfirm} from "../controller/editController.js";

const editRouter = express.Router();

editRouter.get("/:id", editReview);

editRouter.post("/:id/post", editReviewConfirm);

export default editRouter;