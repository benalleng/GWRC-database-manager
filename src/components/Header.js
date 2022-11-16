import { login, logout } from '../firebase';
import { Link } from 'react-router-dom';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';

function Header({ user }) {
    const [open, setOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    const navMenu = () => {
        const x = document.getElementById("myNav");
        if (x.className === "nav") {
          x.className += " responsive";
        } else {
          x.className = "nav";
        }
    };

    const handleLogin = () => {
        login();
        setIsLogin(prevState => !prevState);
    };

    const handleLogout = () => {
        logout();
        setIsLogin(prevState => !prevState);
    };

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

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
                    <h1 className="auth" onClick={handleOpen}>Logout</h1>
                    <Modal
                        open={open}
                        onClose={handleClose}  
                        aria-labelledby="parent-modal-title"
                        aria-describedby="parent-modal-description" 
                    >
                        <Box>
                            <h2 id="parent-modal-title">Logout</h2>
                            <p>
                                Are you sure you want to logout?
                            </p>
                            <button className='confirm' onClick={handleLogout}>Yes</button>
                            <button className='cancel' onClick={handleClose}>Cancel</button>
                        </Box>
                    </Modal>
                </>
                :
                <h1 className="auth" onClick={handleLogin}>Login</h1>
            }
        </nav>
        </>
    )
}

export default Header;