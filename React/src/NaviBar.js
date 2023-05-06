import React from "react";
import "./NaviBarStyle.css"
import Login from "./Login"
import ReactDOM from 'react-dom';
function NaviBar(props) {
  const { handleClick } = props;
  const handleLogout = () => {
    fetch("/api/logout")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          ReactDOM.render(<Login />, document.getElementById('root'));
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <aside className="sidebar">
    <nav className="nav">
      <ul>
      <li><a href="#"  onClick={() => handleClick('MyFeed')}>Feed</a></li>
          <li><a href="#" onClick={() => handleClick('MyProfile')}>Profile</a></li>
          <li><a href="#" onClick={() => handleClick('Setting')}>Setting</a></li>
          <li><a href="#" onClick={handleLogout}>Logout</a></li>
      </ul>
    </nav>
    </aside>
  );
}

export default NaviBar;
