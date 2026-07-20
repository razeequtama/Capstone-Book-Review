// Functions to make the queries and return the result.
import db from "../db/db.js";
import { GET_ALL_REVIEWS } from '../db/reviewQueries.js'; 
import axios from "axios";

export async function getAllReviews()
{
    const result = await db.query(GET_ALL_REVIEWS);

    return result;
}

export async function getBookData(title)
{
    let titleEndpoint = title.toLowerCase().replaceAll(" ", "+").trim();
    const bookData = await axios.get(`https://openlibrary.org/search.json?title=${titleEndpoint}`);
    return bookData.data;
}