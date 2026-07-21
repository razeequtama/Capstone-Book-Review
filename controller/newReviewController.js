import {addNewReview} from "../model/newReviewModel.js";

export async function newReview(req, res)
{
    res.render("edit");
}

export async function newReviewConfirm(req, res)
{
    // console.log(req.body);
    const title = req.body.title;
    const stars = parseInt(req.body.stars);
    const review = req.body.review;
    const author = req.body.author;
    const cover_url = req.body.cover_url;

    try {
        const newReviewData = await addNewReview(title, stars, review, author, cover_url);
        res.redirect("/");
    } catch (error) {
        console.error(error);
        throw error;
    }
    
}