import { Link, useParams } from 'react-router-dom';

import { useState } from 'react';

import Pagination from '../components/Pagination';

function Resources({ grant, user, createGrant }) {

    const { page } = useParams();

    const [currentPage, setCurrentPage] = useState(page);
    const [postsPerPage] = useState(17);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const [ newForm, setNewForm ] = useState({
        name: '',
        title: '',
        image: '',
        organization: '',
        email: '',
        phoneNumber: '',
        relationship: '',
        COC: false,
        notes: '',
        createdByUserId: '',
    });

    const styleObj = {
        fontFamily: 'Lora',
        color: '#d09910',
        fontSize: '30px',
    }

    if(!user) return (
        <div className='login-placeholder'>
            <h1>Please Login to view your Resources</h1>
        </div>
    );
    
}

export default Resources