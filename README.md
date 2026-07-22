# Book Review

A simple full stack CRUD web application where users can search for books, view their covers from the Open Library API, and keep track of their own ratings and reviews.

This project is part of my journey in learning backend and full stack software engineering. Rather than focusing on frontend frameworks, the goal is to strengthen my understanding of server-side development, RESTful routing, databases, and integrating third-party APIs.

---

## Features

* Create, Read, Update, and Delete (CRUD) book reviews
* Search for books using the Open Library Search API
* Automatically retrieve and display book covers using the Open Library Covers API
* Optionally include the author's name in a review
* Store user ratings and reviews in a PostgreSQL database
* Server-side rendered pages using EJS

---

## Tech Stack

### Backend

* Node.js
* Express.js

### Frontend

* EJS
* HTML
* CSS
* JavaScript

### Database

* PostgreSQL

### External APIs

* Open Library Search API
https://openlibrary.org/dev/docs/api/search

* Open Library Covers API
https://openlibrary.org/dev/docs/api/covers

---

## Learning Goals

This project is intentionally designed to practice concepts commonly used in real-world backend development:

* Express routing
* CRUD operations
* PostgreSQL integration
* SQL queries
* Working with third-party REST APIs
* Asynchronous programming with `async/await`
* Server-side rendering with EJS
* Error handling and validation
* Building a complete full stack application without relying on frontend frameworks

---

## Planned Development

This project will be built incrementally.

### Version 1
(Started at: 7/19/2026)
(Completed at: 7/21/2026)

* Basic CRUD functionality
* User enters a book title manually
* Backend retrieves the first matching book from Open Library
* Save review to PostgreSQL

### Version 2
(Started at: 7/21/2026)
(Completed at: 7/21/2026)


* Display the book cover automatically

### Version 3
(Started at: 7/21/2026)
(Completed at: 7/21/2026)

* Display the author's name

### Version 4
(Started at: 7/22/2026)
(Completed at: 7/22/2026)

* Autocomplete search while typing
* Users can select the intended book from search suggestions

### Version 5
(Started at: 7/22/2026)
(Completed at: 7/22/2026)


* Improved styling and user experience

---

## Project Structure

```text
book-ratings/
│
├── public/
│   └── style.css
│
├── controller/
│   ├── deleteController.js
│   ├── editController.js
│   ├── newReviewController.js
│   └── reviewController.js
│
├── db/
│   ├── db.js
│   ├── deleteQueries.js
│   ├── editQueries.js
│   ├── newReviewQueries.js
│   └── reviewQueries.js
│
├── model/
│   ├── deleteModel.js
│   ├── editModel.js
│   ├── newReviewModel.js
│   └── reviewModel.js
│
├── views/
│   ├── edit.ejs
│   └── index.ejs
│
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

*(The folder structure may evolve as the project grows.)*

---

# CRUD Feature

## Edit Review Feature

The EDIT function allows users to modify an existing book review and rating stored in the database.

### How it works

1. **Opening the edit page**

When a user selects the edit option for a review, the review ID is passed through the URL:

```
GET /edit/:id
```

The controller receives the ID and retrieves the matching review from the database using:

```js
getReviewByID(id)
```

The retrieved review data is then passed to the `edit.ejs` template. The form displays the current title, author, review text, and star rating, allowing the user to update the existing information.

2. **Submitting the edited review**

After the user changes the review details, the form sends a POST request:

```
POST /edit/:id/post
```

The submitted data contains:

* `review` → updated review text
* `stars` → updated star rating
* `id` → the review ID from the URL

Example:

```html
<form action="/edit/<%= editingData.id %>/post" method="POST">
```

3. **Updating the database**

The controller receives the updated information:

```js
const review = req.body.review;
const stars = req.body.stars;
const id = req.params.id;
```

It then calls:

```js
editReviewFinish(review, stars, id)
```

The model executes an SQL UPDATE query:

```sql
UPDATE book_reviews
SET review = $1,
    stars = $2
WHERE id = $3;
```

The values are passed using PostgreSQL parameterized queries:

```js
db.query(EDIT_SPECIFIC_REVIEW, [review, stars, id])
```

This ensures that only the selected review is updated and helps protect against SQL injection.

4. **Finishing the edit process**

After the database update is successful, the user is redirected back to the homepage:

```js
res.redirect("/");
```

The updated review will then appear with the rest of the reviews.

### EDIT Feature Flow

```
User clicks Edit
        ↓
GET /edit/:id
        ↓
Retrieve review data from database
        ↓
Display existing review in edit form
        ↓
User modifies review/rating
        ↓
POST /edit/:id/post
        ↓
Update review in book_reviews table
        ↓
Redirect to homepage
        ↓
Updated review is displayed
```

---

## Create Review Feature

The create review flow starts on the `/new` page and ends with a new row in the `book_reviews` table.

### Routes and form

* GET `/new` renders `views/edit.ejs` with no `editingData`.
* The create form posts to:

```html
<form action="/new/post" method="POST">
```

* The form contains:
  * `title`
  * `author`
  * `stars`
  * `review`
  * hidden `cover_url`

### Controller and model

`controller/newReviewController.js` handles the POST request:

```js
const title = req.body.title;
const stars = parseInt(req.body.stars);
const review = req.body.review;
const author = req.body.author;
const cover_url = req.body.cover_url;
await addNewReview(title, stars, review, author, cover_url);
res.redirect("/");
```

The model inserts the review using `db.query` and the SQL query defined in `db/newReviewQueries.js`:

```sql
INSERT INTO book_reviews (title, stars, review, author, cover_url)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;
```

This saves the review, rating, optional author, and cover image URL in PostgreSQL.

### Create Review Flow

```
User clicks Create Review
        ↓
GET /new
        ↓
Render create form
        ↓
User fills title/author/review/stars
        ↓
POST /new/post
        ↓
INSERT into book_reviews
        ↓
Redirect to homepage
        ↓
New review appears in the list
```

---

## Delete Review Feature

Deletion is handled as a simple GET request with a review ID.

### UI and route

In `views/index.ejs`, each review card has a delete link:

```html
<a href="/delete/<%= d.id %>" class="btn btn-danger" onclick=" return confirm('Are you sure?')">Delete</a>
```

The route is defined in `routes/deleteRoutes.js`:

```js
deleteRouter.get("/:id", deleteController);
```

### Controller and model

`controller/deleteController.js` extracts the ID and calls `deleteReview(id)`:

```js
const id = req.params.id;
await deleteReview(id);
res.redirect("/");
```

The model executes the SQL delete query from `db/deleteQueries.js`:

```sql
DELETE FROM book_reviews
WHERE id = $1
RETURNING *;
```

### Delete Review Flow

```
User clicks Delete
        ↓
GET /delete/:id
        ↓
Delete matching row from book_reviews
        ↓
Redirect to homepage
        ↓
Review disappears from list
```

---

## Book Info Fetch (API)

The new review page uses two backend API endpoints to fetch book information from Open Library.

### API endpoints

`routes/newReviewRoutes.js` defines:

* GET `/new/api/cover?title=...`
* GET `/new/api/author?title=...`

Both endpoints require a `title` query parameter and return JSON.

### Cover fetch

`/new/api/cover` calls `getimage(title)` in `model/newReviewModel.js`.

That helper uses `getBookData(title)` from `model/reviewModel.js`:

```js
const bookInfo = await getBookData(title);
const coverID = bookInfo.docs[0].cover_i;
return `https://covers.openlibrary.org/b/id/${coverID}-M.jpg`;
```

The API response is:

```json
{ "coverUrl": "https://covers.openlibrary.org/b/id/12345-M.jpg" }
```

### Author fetch

`/new/api/author` calls `getAuthor(title)`:

```js
const bookInfo = await getBookData(title);
const authorName = bookInfo.docs[0].author_name[0];
return `${authorName}`;
```

The API response is:

```json
{ "authorName": "Author Name" }
```

### Front-end usage

In `views/edit.ejs`, clicking the `Find Image` button triggers both requests in parallel:

```js
const [imageResponse, authorResponse] = await Promise.all([
  fetch(`/new/api/cover?title=${encodeURIComponent(title)}`),
  fetch(`/new/api/author?title=${encodeURIComponent(title)}`)
]);
```

When the requests succeed:

* the cover image is displayed in `#book-cover-img`
* `#book-cover-img-value` stores the cover URL
* author input is filled with the returned author name

### Book Info Fetch Flow

```
User enters title
        ↓
Click Find Image
        ↓
GET /new/api/cover?title=...
        ↓
GET /new/api/author?title=...
        ↓
Receive coverUrl + authorName
        ↓
Show cover preview
        ↓
Fill author field
```

---

## Title Search Suggestion Feature

Autocomplete suggestions are implemented on the `/new` form as the user types a title.

### Suggestion API

`routes/newReviewRoutes.js` adds:

```js
newReviewRouter.get("/api/suggestions", async (req, res) => {
  const title = req.query.title;
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 5, 1), 10);
  const docs = await getBookTitleSuggestions(title, limit);
  const suggestions = docs.map(doc => ({
    title: doc.title,
    author: Array.isArray(doc.author_name) ? doc.author_name[0] : null,
  }));
  res.json({ suggestions });
});
```

The helper in `model/reviewModel.js` calls Open Library:

```js
const bookData = await axios.get(`https://openlibrary.org/search.json?title=${titleEndpoint}&limit=${limit}`);
return bookData.data.docs.slice(0, limit);
```

### Front-end suggestion behavior

In `views/edit.ejs`, the title input listens for `input` events and debounces requests:

```js
suggestionTimer = setTimeout(() => fetchTitleSuggestions(query), 250);
```

`fetchTitleSuggestions` sends:

```js
fetch(`/new/api/suggestions?title=${encodeURIComponent(query)}&limit=6`)
```

The returned suggestions are rendered under the title input. Each item includes the book title and optional author.

### Selecting a suggestion

When the user clicks a suggestion:

* the title input is updated
* the author field is filled if available
* the cover preview is reset
* the `Find Image` button is automatically triggered

This keeps the user interaction smooth and reuses the existing book info fetch flow.

### Title Search Suggestion Flow

```
User types title
        ↓
GET /new/api/suggestions?title=...
        ↓
Render dropdown suggestions
        ↓
User clicks suggestion
        ↓
Title + author are filled
        ↓
Trigger Find Image
        ↓
Fetch cover and author data
```

---

## Future Improvements

Some features I may add in later iterations include:

* Authentication
* Multiple reviews per user
* Sorting by rating
* Search and filtering
* Pagination
* Responsive UI
* AJAX-powered autocomplete
* Deploying the application online

---

## Why This Project?

Instead of building a simple to-do list, I wanted a project that combines database design, external APIs, and CRUD functionality into something that resembles a real-world application.

The objective isn't only to finish a project, but to understand how backend services communicate with databases, APIs, and the frontend to deliver a complete user experience.

---

## Acknowledgements

Book metadata and cover images are provided by the Open Library APIs.

* https://openlibrary.org/dev/docs/api/search
* https://openlibrary.org/dev/docs/api/covers
