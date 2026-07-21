import db from "../db/db.js";
import {EDIT_SPECIFIC_REVIEW} from "../db/editQueries.js"

export async function editReviewFinish(review, stars, id)
{
    try {
        const result = await db.query(EDIT_SPECIFIC_REVIEW, [review, stars, id]);
        return result.rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}