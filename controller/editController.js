import { getReviewByID } from "../model/reviewModel.js";
import {editReviewFinish} from "../model/editModel.js"

export async function editReview(req, res){

    const id = req.params.id;
    const editingReview = await getReviewByID(id);
    const editingData = editingReview.rows[0];
    // console.log(editingData);
    res.render("edit", {editingData});

}

export async function editReviewConfirm(req, res) {
    const id = req.params.id;
    const review = req.body.review;
    const stars = req.body.stars;

    try {
        await editReviewFinish(review, stars, id);
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send("Edit failed!");
    }
}