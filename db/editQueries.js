export const EDIT_SPECIFIC_REVIEW =
`
    UPDATE book_reviews
    SET review = $1, stars = $2
    WHERE id = $3
    RETURNING *;
`;