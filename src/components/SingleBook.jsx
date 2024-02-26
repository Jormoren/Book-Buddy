import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleBook } from "../Api";

const SingleBook = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getBookDetails() {
            try {
                setLoading(true);
                if (!id) {
                    throw new Error("Book ID is missing.");
                }
                const bookDetails = await fetchSingleBook(id);
                setBook(bookDetails);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }
        getBookDetails();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
            <h2>Single Book: Id of {id}</h2>
            {book ? (
                <ul className="singleBook"> 
                    <li>Title: {book.title}</li>
                    <li><img src={book.coverimage} alt={book.title} /></li>
                    <li>Author: {book.author}</li>
                    <li>Description: {book.description}</li>
                    <li>ID: {book.id}</li>
                    <li>Available: {book.available}</li>
                    <button> Checkout Book </button>
                    <button> Return Book </button>
                </ul>
            ) : (
                <div>Book not found.</div>
            )}
        </div>
    );
}

export default SingleBook;
