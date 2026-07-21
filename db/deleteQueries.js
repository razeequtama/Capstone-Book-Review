export const DELETE_SPECIFIC_REVIEW =
`
DELETE FROM book_reviews
WHERE id = $1
RETURNING *;
`;
