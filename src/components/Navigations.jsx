import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul id="navigation">
        <li>
          <Link to="/" className="nav-link">Books</Link>
        </li>
        <li>
          <Link to="/singleBook" className="nav-link">Single Book</Link>
        </li>
        <li>
          <Link to="/account" className="nav-link">Account</Link>
        </li>
        <li>
          <Link to="/login" className="nav-link">Login</Link>
        </li>
        <li>
          <Link to="/register" className="nav-link">Register</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
