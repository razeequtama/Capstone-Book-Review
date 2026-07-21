import {getBookData} from "./reviewModel.js";
import {CREATE_NEW_REVIEW} from "../db/newReviewQueries.js"
import db from "../db/db.js";

export async function getimage(title)
{
    try {
        const bookInfo = await getBookData(title);
        const coverID = bookInfo.docs[0].cover_i;
        return `https://covers.openlibrary.org/b/id/${coverID}-M.jpg`;
    } catch (error) {
        console.error(error);
        throw error;
    }
    
}

export async function getAuthor(title)
{
    try {
        const bookInfo = await getBookData(title);
        const authorName = bookInfo.docs[0].author_name[0];
        return `${authorName}`;
    } catch (error) {
        console.error(error);
        throw error;
    }
    
}

export async function addNewReview(title, stars, review, author, cover_url)
{
    try {
        const newReviewAdd = await db.query(CREATE_NEW_REVIEW, [title, stars, review, author, cover_url])
        return newReviewAdd.rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}