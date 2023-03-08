import React from 'react';
import { Link } from 'react-router-dom';
import './Homescreen.css';

const BaseUrl = 'http://localhost:8080/';

function Homescreen({navigation}) {
  return (
    <div className="Homescreen">
      <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li onClick={() => window.location.href = BaseUrl + 'about.json'}><a href="#">About</a></li>
          </ul>
        </nav>
        <div className="buttons">
          <Link to="/signin"><button>Sign In</button></Link>
          <Link to="/signup"><button>Sign Up</button></Link>
        </div>
      </header>
      <main>
        <h1>Welcome to my website!</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dui vel mi porttitor pellentesque. Nullam lacinia metus eu turpis vulputate euismod.</p>
      </main>
    </div>
  );
}

export default Homescreen;