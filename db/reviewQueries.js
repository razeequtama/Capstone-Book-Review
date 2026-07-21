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

export const TEST_REVIEWS = `
    INSERT INTO book_reviews (title, stars, review)
    VALUES 
        ('The Hobbit', 5, 'Great fantasy book! Amazing world-building.'),
        ('1984', 4, 'Very thought-provoking and dark, a masterpiece.'),
        ('Dracula', 3, 'A bit slow in the middle, but still a classic goth novel.');
`;

export const REMOVE_TEST_REVIEWS = `
    TRUNCATE TABLE book_reviews RESTART IDENTITY;
`;// RESTART IDENTITY: Memastikan kalau Anda memasukkan data baru lagi nanti, ID-nya akan mulai dari 1 (bukan melanjutkan ID yang lama).