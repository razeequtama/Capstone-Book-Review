// Query names so it's easy to use.
export const GET_ALL_REVIEWS = `
    SELECT *
    FROM book_reviews;
`;

export const GET_REVIEW_BY_ID = `
    SELECT *
    FROM book_reviews
    WHERE id = $1;
`;