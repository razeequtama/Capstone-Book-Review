import { getReviewByID } from "../model/reviewModel.js";

export default async function editReview(req, res){

    const id = req.params.id;
    const editingReview = await getReviewByID(id);
    const editingData = editingReview.rows[0];
    // console.log(editingData);
    res.render("edit", {editingData});

}