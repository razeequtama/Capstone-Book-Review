import {deleteReview} from "../model/deleteModel.js";

export default async function deleteController(req, res){
    const id = req.params.id;

    try {
        const deletion = await deleteReview(id);
        res.redirect("/");
    } catch (error) {
        console.error(error);
        throw error;
    }
}