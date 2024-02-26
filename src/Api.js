// Api.js

const API_URL = 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api';

// Fetch all books
export async function fetchBooks() {
    try {
        const response = await fetch(`${API_URL}/books`);
        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
}

// Fetch a single book by ID
export async function fetchSingleBook(bookId) {
    try {
        const response = await fetch(`${API_URL}/books/${bookId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch book #${bookId}`);
        }
        const result = await response.json();
        return result.book;
    } catch (error) {
        console.error(`Error fetching book #${bookId}:`, error);
        throw error;
    }
}

// Export the fetchRegister function
export async function fetchRegister(firstname, lastname, email, password) {
    try {
        const response = await fetch(`${API_URL}/users/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstname,
                lastname,
                email,
                password
            })
        });
        if (!response.ok) {
            throw new Error('Failed to register user');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
}
