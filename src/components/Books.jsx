import React, { useState, useEffect } from "react";
import { fetchBooks } from "../Api";
import { useNavigate } from "react-router-dom";

const Books = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        async function fetchData() {
            try {
                const fetchedBooks = await fetchBooks();
                setBooks(fetchedBooks);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const navigate = useNavigate();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
            <h1>Books</h1>
            <p>Take a look at our books:</p>
            <ul>
                {Array.isArray(books) && books.map(book => (
                    <li className="bookCard" key={book.id}>
                        <h3>{book.title}</h3>
                        <img src={book.coverimage} alt={book.title} />
                        <p>By: {book.author}</p>
                        <p>Description: {book.description}</p>
                        <button onClick={() => navigate(`books/${book.id}`)}>Book Details</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Books;
