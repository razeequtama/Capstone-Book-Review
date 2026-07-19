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
(Completed at: On Progress)

* Basic CRUD functionality
* User enters a book title manually
* Backend retrieves the first matching book from Open Library
* Save review to PostgreSQL

### Version 2
(Started at: -)
(Completed at: -)


* Display the book cover automatically

### Version 3
(Started at: -)
(Completed at: -)


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
