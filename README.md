# Book Ratings

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
(Started at: -)
(Completed at: -)

* Autocomplete search while typing
* Users can select the intended book from search suggestions

### Version 5
(Started at: -)
(Completed at: -)


* Improved styling and user experience

---

## Project Structure

```text
book-ratings/
│
├── public/
│   ├── css/
│   └── js/
│
│
├── controller/
│
├── db/
│
├── model/
│
├── views/
│
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

*(The folder structure may evolve as the project grows.)*

---

# CRUD Feature

## Edit Review Function

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

### EDIT Function Flow

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
