import express from "express";
import { newReview, newReviewConfirm } from "../controller/newReviewController.js";
import { getimage, getAuthor } from "../model/newReviewModel.js"; // Import your model function here
import { getBookTitleSuggestions } from "../model/reviewModel.js";

const newReviewRouter = express.Router();

newReviewRouter.get("/", newReview);

// NEW: API endpoint for the browser to fetch book covers
newReviewRouter.get("/api/cover", async (req, res) => {
    try {
        const title = req.query.title;
        if (!title) {
            return res.status(400).json({ error: "Title is required" });
        }
        
        
        const coverUrl = await getimage(title);
        res.json({ coverUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch book cover" });
    }
});

newReviewRouter.get("/api/author", async (req, res) => {
    try {
        const title = req.query.title;
        if (!title) {
            return res.status(400).json({ error: "Title is required" });
        }
        
        const authorName = await getAuthor(title);
        res.json({ authorName });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch author name" });
    }
});

newReviewRouter.get("/api/suggestions", async (req, res) => {
    try {
        const title = req.query.title;
        const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 5, 1), 10);

        if (!title) {
            return res.status(400).json({ error: "Title is required" });
        }

        const docs = await getBookTitleSuggestions(title, limit);
        const suggestions = docs.map(doc => ({
            title: doc.title,
            author: Array.isArray(doc.author_name) ? doc.author_name[0] : null,
        }));

        res.json({ suggestions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch title suggestions" });
    }
});

newReviewRouter.post("/post", newReviewConfirm);

export default newReviewRouter;
