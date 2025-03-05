import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <ul className="list">
          <li><Link to="/">Dashboard</Link></li>
        
          <li><Link to="/add">Add Book</Link></li>
       
        </ul>
      </nav>
    </header>
  );
};

export default Header;
