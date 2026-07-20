// Functions to make the queries and return the result.
import db from "../db/db.js";
import { GET_ALL_REVIEWS } from '../db/reviewQueries.js'; 

export async function getAllReviews()
{
    const result = await db.query(GET_ALL_REVIEWS);

    return result;
}