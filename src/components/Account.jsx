import { useState, useEffect } from 'react';
import Login from './Login';
import PropTypes from 'prop-types';

const Account = ({ onLogin }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [checkedOutBooks, setCheckedOutBooks] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (authenticatedUser) {
        try {
          const userResponse = await fetch('/api/users/me', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authenticatedUser.token}`,
            },
          });

          if (!userResponse.ok) {
            throw new Error('Failed to fetch user data');
          }

          const userData = await userResponse.json();
          setAuthenticatedUser({ ...authenticatedUser, ...userData });

          const checkedOutResponse = await fetch('/api/reservations', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authenticatedUser.token}`,
            },
          });

          if (!checkedOutResponse.ok) {
            throw new Error('Failed to fetch checked-out books');
          }

          const checkedOutData = await checkedOutResponse.json();
          setCheckedOutBooks(checkedOutData);
        } catch (error) {
          console.error(error.message);
        }
      }
    };

    fetchUserData();
  }, [authenticatedUser]);

  const handleLogin = (userData) => {
    setAuthenticatedUser(userData);
    if (onLogin) {
      onLogin(userData);
    }
  };

  const handleCheckout = async () => {
    try {
      const checkoutResponse = await fetch('/api/books/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authenticatedUser.token}`,
        },
      });

      if (!checkoutResponse.ok) {
        throw new Error('Failed to checkout the book');
      }

      const updatedCheckedOutResponse = await fetch('/api/reservations', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authenticatedUser.token}`,
        },
      });

      if (!updatedCheckedOutResponse.ok) {
        throw new Error('Failed to fetch updated checked-out books');
      }

      const updatedCheckedOutData = await updatedCheckedOutResponse.json();
      setCheckedOutBooks(updatedCheckedOutData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleReturn = async (reservationId) => {
    try {
      const returnResponse = await fetch(`/api/reservations/${reservationId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authenticatedUser.token}`,
        },
      });

      if (!returnResponse.ok) {
        throw new Error('Failed to return the book');
      }

      const updatedCheckedOutResponse = await fetch('/api/reservations', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authenticatedUser.token}`,
        },
      });

      if (!updatedCheckedOutResponse.ok) {
        throw new Error('Failed to fetch updated checked-out books');
      }

      const updatedCheckedOutData = await updatedCheckedOutResponse.json();
      setCheckedOutBooks(updatedCheckedOutData);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="account-container">
      {authenticatedUser ? (
        <div>
          <h2 className="account-header">Welcome, {authenticatedUser.firstname}!</h2>
          <div className="checked-out-container">
            <h3 className="account-header">Checked Out Books</h3>
            {checkedOutBooks.length === 0 ? (
              <p>No books currently checked out.</p>
            ) : (
              <ul className="checked-out-list">
                {checkedOutBooks.map((book) => (
                  <li key={book.id} className="checked-out-item">
                    <div className="checked-out-title">
                      {book.title} - {book.author}
                    </div>
                    <button className="return-button" onClick={() => handleReturn(book.id)}>
                      Return
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="checkout-container">
            <h3 className="account-header">Checkout a Book</h3>
            <button className="checkout-button" onClick={handleCheckout}>
              Checkout Book 1
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="account-info">
            Please log in or create an account to view your account details.
          </p>
          <Login onLogin={handleLogin} />
          <p className="account-info">
            Do not have an account? <a href="/register">Sign up</a>
          </p>
        </div>
      )}
    </div>
  );
};

Account.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Account;
