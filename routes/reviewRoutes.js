// The route ("/reviews")
import express from "express";
import getAllReviews from "../controller/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.get("/", getAllReviews);

export default reviewRouter;