import { Link, useParams } from 'react-router-dom';

import { useState } from 'react';

import { ResourcesPaginate } from '../components/Pagination';

function Resources({ resources, user, createResources, sortPeopleAlphabetical }) {

    const { page } = useParams();

    const [currentPage, setCurrentPage] = useState(page);
    const [postsPerPage] = useState(15);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const [ newForm, setNewForm ] = useState({
        name: '',
        description: '',
        url: '',
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

    const loaded = () => {
        resources = sortPeopleAlphabetical(resources)
        const currentResources = resources.slice(indexOfFirstPost, indexOfLastPost)
        return (
            <div>
            {currentResources.map(resource => (
                <div className="resource" key={resource._id}>
                    <h2>
                        <Link to={`/resources/resource/${resource._id}`}>
                            {resource.name}
                        </Link>
                    </h2>
                </div>
            ))}
            <ResourcesPaginate
                postsPerPage={postsPerPage}
                totalPosts={resources.length}
                paginate={paginate}
                pageNum={page}
            />
            </div>
        )
    };

    const loading = () => {
        return <h1>Loading ...</h1>;
    };

    const handleChange = (e) => {
        setNewForm({
            ...newForm,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!newForm.image) delete newForm.image
        createResources(newForm);
        setNewForm({
            name: '',
            description: '',
            url: '',
            createdByUserId: '',
        });
    };

    const clearInput = (e) => {
        e.preventDefault();
        setNewForm({
            name: '',
            description: '',
            url: '',
            createdByUserId: ''
        });
    };

    return (
        <section className="Index">
            <div className="top-main">
            <h2 style={styleObj}>
                <span className='red-create'>Create </span>New Resource:
            </h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <input 
                        type="text"
                        value={newForm.name} 
                        onChange={handleChange}
                        placeholder="Name"
                        name="name"
                        />
                </label>
                <label>
                    <input 
                        type="text"
                        value={newForm.description} 
                        onChange={handleChange}
                        placeholder="Description"
                        name="description"
                        />
                </label>
                <label>
                    <input 
                        type="url"
                        value={newForm.url} 
                        onChange={handleChange}
                        placeholder="http://resource-website.com"
                        name="url"
                        />
                </label>
                <div className="submit-box">
                    <input className="submit" type="submit" value="Submit" />
                    <button className='clear' onClick={clearInput}>Clear</button>
                </div>
            </form>
            </div>
            <div className='index-list'>
            <h2 style={styleObj}>
                Resources:
            </h2>
            { resources ? loaded() : loading() }
            </div>
        </section>
    )
    
}

export default Resources;