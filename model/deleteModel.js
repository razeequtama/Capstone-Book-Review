import db from "../db/db.js";
import {DELETE_SPECIFIC_REVIEW} from "../db/deleteQueries.js";

export async function deleteReview(id) {
    try {
        const deletionResult = await db.query(DELETE_SPECIFIC_REVIEW, [id]);
        return deletionResult.rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}