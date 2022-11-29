import React, {useState} from "react";
import { Link, Navigate } from "react-router-dom";
import { auth, createUserWithEmailAndPassword } from "../firebase.js";

const SignUp = () => {
  const [currentUser, setCurrentUser] = useState(null); 
  
  const styleObj = {
    fontFamily: 'Lora',
    color: '#c9000f',
    fontSize: '30px',
  }
  
  const styleBlack = {
    color: '#000'
  }

  const handleSubmit = (e) => {
    e.preventDefault();    
    const { email, password, confirm } = e.target.elements;
    try {
      if (password.value !== confirm.value) {   
        alert("Passwords do not match, please try again")
        password.value = '';
        confirm.value = '';
        setCurrentUser(false)
      } else if (password.value.length < 6) {
        alert("Password not strong enough, please use a password with at least 6 characters")
        password.value = '';
        confirm.value = '';
        setCurrentUser(false)
      } else if (email.value.split('@')[1] === 'gwregion.org') {
        const promise = createUserWithEmailAndPassword(auth, email.value, password.value);      
        promise.catch(e => alert(e.toString().split(':')[2]));
        setCurrentUser(true);
      } else {
        alert('Please Enter a valid email address.')
        email.value = '';
        password.value = '';
        confirm.value = '';
      } 
    } catch (error) {
      alert(error);
    }
  };
  if (currentUser) {
    return <Navigate to="/search" />;
  }
  return (
    <div className="signin">
      <h1 style={styleObj}>Sign Up</h1>
      <form onSubmit={handleSubmit} className="signin-form">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" placeholder="Email" />
        <br/>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" placeholder="Password" />
        <label htmlFor="confirm">Confirm Password</label>
        <input type="password" name="confirm" placeholder="Confirm Password"/>
        <button class="submit" type="submit">Submit</button>
      </form>
        <Link stlye={styleBlack} to='/login'>
            <button className="submit">
                Login
            </button>
        </Link>
    </div>
  );
};

export default SignUp;