import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import db from "./db/db.js";
import reviewRouter from "./routes/reviewRoutes.js";
import editRouter from "./routes/editRoutes.js";
import deleteRouter from "./routes/deleteRoutes.js";
import newReviewRouter from "./routes/newReviewRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3000;

try {
    await db.query("SELECT 1");
    console.log("Connected to PostgreSQL");
} catch (err) {
    console.error("Failed to connect:", err);
    process.exit(1);
}

// Set EJS as template engine
app.set("view engine", "ejs");

// Set views directory
app.set("views", path.join(__dirname, "views"));

// Set static default directory to public/
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/reviews", reviewRouter);
app.use("/edit", editRouter);
app.use("/delete", deleteRouter);
app.use("/new", newReviewRouter);

app.get("/", (req, res) => {
    res.redirect("/reviews");
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});