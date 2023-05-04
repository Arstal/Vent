import React, {useState} from "react";
import Login from "./Login"
import ReactDOM from 'react-dom';
function LogOutButton(){
    const [loggedOut, setLoggedOut] = useState(false);
    
    const handleLogout = () => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => {
                if(data.success) {
                    setLoggedOut(true)
                    ReactDOM.render(<Login />, document.getElementById('root'));
                }
            })
            .catch((error) => console.log(error));
    };
    return(
        <button onClick={handleLogout}>
            {loggedOut ? "Logged out!" : "Log out"}
        </button>
    )
}
export default LogOutButton;