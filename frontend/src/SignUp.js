import React, { useState } from 'react';
import Login from './Login';
import ReactDOM from 'react-dom';

function SignUp(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSignUp, setIsSignUp] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password, email }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Handle successful signup
        if(data["signedUp"] == true){
          ReactDOM.render(<Login />, document.getElementById('root'));
        }
      })
      .catch(error => {
        // Handle failed signup
        console.error('There was an error signing up:', error);
        setErrorMessage('There was an error signing up. Please try again.');
      });
  };

  const handleToggle = () => {
    setIsSignUp(prevState => !prevState);
  }

  return (
    <div className="overlay"> 
    {isSignUp ? (
      <form onSubmit={handleSubmit}> 
        <h2 className="title">Sign Up</h2>
        {errorMessage && (
          <div className="error-message">{errorMessage}</div>
        )}
        <div className="con">  
          <div className="field-set">
            <label>
              <input type="text" className="form-input" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
              <input type="password" className="form-input" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </label>
            <label>
              <input type="email" className="form-input" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            </label>
            <button className="btn submits sign-up" type="submit">Sign up</button>
            <button className="btn submits sign-up" type="button" onClick={handleToggle}>Log in</button>
          </div> 
        </div>
      </form>
    ) : (
        <Login onToggle={handleToggle} />
      )}
    </div>
  );
  }

export default SignUp;