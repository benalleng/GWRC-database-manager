import { Link } from 'react-router-dom';

function Footer(props) {
    return(
        <footer id='main-footer'>
            <div className='container'>
                <div className='footer-top-container'>
                <div className="footer-block">
                    <h4>
                        George Washington Regional Commission
                    </h4>
                </div>
                <div className="footer-block">
                    <h4>
                        Sitemap
                    </h4>
                    <ul className="sitemap">
                        <li>
                            <Link to='/contacts/1'>
                                Contacts
                            </Link>
                        </li>
                        <li><Link to='/grants/1'>
                                Grants
                            </Link>
                        </li>
                        <li>
                            <Link to='/resources/1'>
                                Resources
                            </Link>
                        </li>
                    </ul>
                </div>
                </div>
                <div className='footer-bottom'>
                    <div id="bottom-container" className='container'>
                        <div className='footer-text'>
                            <p className="copyright">
                                © George Washington Regional Commission
                            </p>
                            <p className='designer'>
                                Website Designed By Ben G. 
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;