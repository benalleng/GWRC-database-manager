import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "./Auth";
import { auth, signInWithEmailAndPassword } from "../firebase.js";

const LogIn = () => {
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
    const { email, password } = e.target.elements;
    try {
      const promise = signInWithEmailAndPassword(auth, email.value, password.value);
      promise.catch(e => alert(e.toString().split(':')[2]));
      email.value = '';
      password.value = '';
    } catch (error) {
      alert(`please try again ${error}`)
      email.value = '';
      password.value = '';
    }
  };
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    alert(`Logged in as ${currentUser.email}`)
    return <Navigate to="/search" />;
  }
  return (
    <div className="signin">
      <h1 style={styleObj}>Log In</h1>
      <form onSubmit={handleSubmit} className="signin-form">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" placeholder="Email" />
        <br/>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" placeholder="Password" />
        <button class="submit" type="submit">Submit</button>
      </form>
        <Link style={styleBlack} to='/signup'>
            <button className="submit">
                Signup
            </button>
        </Link>
    </div>
  );
};

export default LogIn;