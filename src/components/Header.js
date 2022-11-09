import { login, logout } from '../firebase';
import { Link } from 'react-router-dom';

function Header({ user }) {

    const navMenu = () => {
        const x = document.getElementById("myNav");
        if (x.className === "nav") {
          x.className += " responsive";
        } else {
          x.className = "nav";
        }
      } 

    return(
        <>
            <div className='logo-container'>
                <Link to='/search'>
                    <img src="https://www.gwregion.org/wp-content/uploads/2018/03/logo.png" alt="George Washington Regional Commission" id="logo" data-height-percentage="90" data-actual-width="286" data-actual-height="101"></img>
                </Link>
            </div>
        <nav className='nav' id="myNav">
            <Link to='/search'>
                <h1>Search</h1>
            </Link>
            <Link to='/contacts/1'>
                <h1>Contact Management</h1>
            </Link>
            <Link to='/grants/1'>
                <h1>Grant Tracker</h1>
            </Link>
            <Link to='/resources/1'>
                <h1>Resources</h1>
            </Link>
            <button onClick={navMenu} className="icon">&#9776;</button>
            {
                user ?
                <>
                    <h1 className='auth-welcome'>Hi, {user.displayName.split(' ')[0]}!</h1>
                    <h1 className="auth" onClick={logout}>Logout</h1>
                </>
                :
                <h1 className="auth" onClick={login}>Login</h1>
            }
        </nav>
        </>
    )
}

export default Header;