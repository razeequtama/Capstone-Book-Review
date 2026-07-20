// Controlling the req, res callback
import { getAllReviews as getAllReviewsQuery } from "../model/reviewModel.js";

export default async function getAllReviews(req, res){

    const reviews = await getAllReviewsQuery();
    const data = reviews.rows;

    console.log(data);

    res.render("index", {data});

}