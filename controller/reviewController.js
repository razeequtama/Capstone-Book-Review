// Controlling the req, res callback
import { getAllReviews as getAllReviewsQuery, getBookData } from "../model/reviewModel.js";

export default async function getAllReviews(req, res){

    const reviews = await getAllReviewsQuery();
    const data = reviews.rows;

    for (const d of data) {
        try {
            // Added 'await' here so it resolves the promise
            let book_info = await getBookData(d.title); 
            
            // OpenLibrary returns an object directly with Axios, navigate docs safely
            if (book_info && book_info.docs && book_info.docs.length > 0) {
                let cover_id = book_info.docs[0].cover_i;
                
                if (cover_id) {
                    let cover_url = `https://covers.openlibrary.org/b/id/${cover_id}-M.jpg`;
                    d.cover_image = cover_url; 
                } else {
                    d.cover_image = "/path/to/default-cover.jpg"; // Fallback image
                }
            }
        } catch (error) {
            console.error(`Error fetching cover for ${d.title}:`, error);
            d.cover_image = "/path/to/default-cover.jpg";
        }
    }

    console.log(data);

    res.render("index", {data});

}