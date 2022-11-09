import { login, logout } from '../firebase';
import { Link } from 'react-router-dom';

function Header({ user }) {
    return(
        <>
            <div className='logo-container'>
                <Link to='/search'>
                    <img src="https://www.gwregion.org/wp-content/uploads/2018/03/logo.png" alt="George Washington Regional Commission" id="logo" data-height-percentage="90" data-actual-width="286" data-actual-height="101"></img>
                </Link>
            </div>
        <nav className='nav'>
            <Link to='/contacts/1'>
                <h1>Contact Management</h1>
            </Link>
            <Link to='/grants/1'>
                <h1>Grant Tracker</h1>
            </Link>
            <Link to='/resources/1'>
                <h1>Resources</h1>
            </Link>
            <section className="auth-options">
                {
                    user ? 
                    <>
                        <div>Welcome, {user.displayName}</div>
                        <div className='auth' onClick={logout}>Logout</div>
                    </>
                    :
                    <div className='auth' onClick={login}>Login</div>
                }
            </section>
        </nav>
        </>
    )
}

export default Header;