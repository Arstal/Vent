import React, {useState} from "react";
import PostForm from "./PostForm.js";
import NaviBarIcon from "./assets/NaviBarIcon.png";
import PostFormIcon from "./assets/PostFormIcon.png";
import MyFeed from './MyFeed';
import MyProfile from './MyProfile';
import Setting from './Setting';
import NaviBar from './NaviBar'
import LogOutButton from "./LogOutButton";
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
          <img className ="UIIcons" id="NaviBarIcon" src={NaviBarIcon} alt="NaviBar" />
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
        {activeElement === 'Logout' && (
          <LogOutButton />
        )}
        {activeElement === 'MyFeed' || activeElement === 'MyProfile' ? (
          <button className ="PostButton" onClick={togglePostForm}>
            <img className ="UIIcons" id="PostFormIcon" src={PostFormIcon} alt="PostForm" />
          </button>
        ) : null}
        {activeElement === 'MyFeed' || activeElement === 'MyProfile' ? (
          isPostFormOpen && <PostForm />
        ) : null}
      </footer>
    );
}

export default Footer;