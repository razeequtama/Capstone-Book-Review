import express from "express";
import { newReview, newReviewConfirm } from "../controller/newReviewController.js";
import { getimage, getAuthor } from "../model/newReviewModel.js"; // Import your model function here

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

newReviewRouter.post("/post", newReviewConfirm);

export default newReviewRouter;
