export const CREATE_NEW_REVIEW =
`
    INSERT INTO book_reviews (title, stars, review, author, cover_url)
    VALUES 
        ($1, $2, $3, $4, $5)
    RETURNING *;
`