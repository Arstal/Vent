import React, {useState} from "react";
import PostForm from "./PostForm.js";
import MyFeed from './MyFeed';
import MyProfile from './MyProfile';
import Setting from './Setting';
import NaviBar from './NaviBar'
import "./Footer.css"

function Footer(){
    const [isNaviBarOpen, setIsNaviBarOpen] = useState(false);
    const [isPostFormOpen, setIsPostFormOpen] = useState(false);
    const [activeElement, setActiveElement] = useState(null);
    const toggleNaviBar = () => {
        setIsNaviBarOpen(!isNaviBarOpen);
    }
    const handleNaviBarClick = (element) => {
        setActiveElement(element);
        setIsNaviBarOpen(false);
    }
    const togglePostForm = () => {
      setIsPostFormOpen(!isPostFormOpen);
    }
    return(
        <footer>
        <button className ="NaviBarButton" onClick={toggleNaviBar}>
        </button>
        {isNaviBarOpen && <NaviBar handleClick={handleNaviBarClick} />}
        {activeElement === 'MyFeed' && (
          <MyFeed />
        )}
        {activeElement === 'MyProfile' && (
          <MyProfile />
        )}
        {activeElement === 'Setting' && (
          <Setting />
        )}
        {activeElement === 'MyFeed' || activeElement === 'MyProfile' ? (
          <button className ="PostButton" onClick={togglePostForm}>
          <span class="plus-sign">+</span>
          </button>
        ) : null}
        {activeElement === 'MyFeed' || activeElement === 'MyProfile' ? (
          isPostFormOpen && <PostForm />
        ) : null}

      </footer>
    );
}

export default Footer;