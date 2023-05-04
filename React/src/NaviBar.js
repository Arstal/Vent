import React from "react";
import "./NaviBarStyle.css"

function NaviBar(props) {
  const { handleClick } = props;
  return (
    <aside className="sidebar">
    <nav className="nav">
      <ul>
      <li><a href="#"  onClick={() => handleClick('MyFeed')}>Feed</a></li>
          <li><a href="#" onClick={() => handleClick('MyProfile')}>Profile</a></li>
          <li><a href="#" onClick={() => handleClick('Setting')}>Setting</a></li>
          <li><a href="#" onClick={() => handleClick('Logout')}>Logout</a></li>
      </ul>
    </nav>
    </aside>
  );
}

export default NaviBar;