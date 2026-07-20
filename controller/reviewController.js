// Controlling the req, res callback
import { getAllReviews as getAllReviewsQuery, getBookData } from "../model/reviewModel.js";

export default async function getAllReviews(req, res) {
    try {
        const reviews = await getAllReviewsQuery();
        const data = reviews.rows;

        // 1. Map each review to a Promise (firing them all off concurrently)
        const enrichmentPromises = data.map(async (d) => {
            try {
                let book_info = await getBookData(d.title);
                let author_info = book_info.docs[0].author_name[0];
                d.author_name = author_info;
                
                let cover_id = book_info.docs[0].cover_i;
                d.cover_image = `https://covers.openlibrary.org/b/id/${cover_id}-M.jpg`;
            } catch (error) {
                console.error(`Error fetching data for ${d.title}:`, error.message);
                d.cover_image = "../fallback_images/Cover.png";
            }
        });

        // 2. Wait for all the APIs to resolve at once
        // Parallel Execution via Array.prototype.map() and Promise.all():
        await Promise.all(enrichmentPromises);
        // Instead of pausing execution on every loop iteration, .map()
        // creates an array of unsettled Promises. Promise.all() processes
        // them simultaneously. The wait time drops from (Number of books × API response time)
        // down to (The single slowest API response time).

        // Isolated Try/Catch blocks: If OpenLibrary fails for one specific book title, it won't
        // crash the loop or halt the entire page load. It gracefully falls back to your images
        // for that specific item.
        

        console.log(data);
        res.render("index", { data });

    } catch (globalError) {
        console.error("Database or execution error:", globalError);
        res.status(500).send("Internal Server Error");
    }
}