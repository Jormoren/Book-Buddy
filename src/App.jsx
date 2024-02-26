import { Routes, Route } from 'react-router-dom';
import Navigations from './components/Navigations';
import { Books, Account, Login, Register, SingleBook } from './components';
import './App.css';
import { useState } from 'react';
import bookLogo from './assets/books.png';

function App() {
  const [token, setToken] = useState(null);
  
  return (
    <>
      <div>
        <Navigations />
        <main>
          <h1><img id='logo-image' src={bookLogo} alt="Books Logo" />Library App</h1>
          <Routes>
            <Route path="/" element={<Books />} />
            <Route path="/account" element={<Account onLogin={() => {}} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register setToken={setToken} />} />
            <Route path="/singleBook" element={<SingleBook />} />
            <Route path="/books/:id" element={<SingleBook />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
