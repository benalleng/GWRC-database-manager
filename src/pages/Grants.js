import { Link, useParams } from 'react-router-dom';

import { useState } from 'react';

import { GrantsPaginate } from '../components/Pagination';

function Grants({ grants, user, createGrants, sortPostsAlphabetical }) {

    const { page } = useParams();

    const [currentPage, setCurrentPage] = useState(page);
    const [postsPerPage] = useState(15);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const [ newForm, setNewForm ] = useState({
        name: '',
        organization: '',
        description: '',
        dateDue: '',
        dateOpen: '',
        applied: false,
        succeeded: false,
        url: '',
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
            <h1>Please Login to track your Grants</h1>
        </div>
    );

    const loaded = () => {
        grants = sortPostsAlphabetical(grants)
        const currentGrants = grants.slice(indexOfFirstPost, indexOfLastPost)
        return (
            <div>
            {currentGrants.map(grant => (
                <div className="grant" key={grant._id}>
                    <h2>
                        <Link to={`/grants/grant/${grant._id}`}>
                            {grant.name}
                        </Link>
                    </h2>
                    <h4 className="grant-org">
                        from {grant.organization}
                    </h4>
                </div>
            ))}
            <GrantsPaginate
                postsPerPage={postsPerPage}
                totalPosts={grants.length}
                paginate={paginate}
                pageNum={page}
                />
            </div>
        )
    }

    const loading = () => {
        return <h1>Loading ...</h1>;
    };

    const handleChange = (e) => {
        handleCheckClick();
        setNewForm({
            ...newForm,
            [e.target.name]: e.target.value
        });
    };

    const handleCheckClick = () => {
        let appliedBool = !newForm.applied;
        setNewForm({ applied: appliedBool});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createGrants(newForm);
        setNewForm({
            name: '',
            organization: '',
            description: '',
            dateDue: '',
            dateOpen: '',
            applied: false,
            succeeded: false,
            url: '',
            notes: '',
            createdByUserId: '',
        });
    }

    return (
        <section className='Index'>
            <div className="top-main">
            <h2 style={styleObj}>
                <span className='red-create'>Enter </span>New Grant:
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
                        value={newForm.organization}
                        onChange={handleChange}
                        placeholder="Organiztion"
                        name="organization"
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
                        type="text"
                        value={newForm.dateDue}
                        onChange={handleChange}
                        placeholder="Date Due YYYY-MM-DD"
                        pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" 
                        title="YYYY-MM-DD or leave blank"
                        name="dateDue"
                    />
                </label>
                <label>
                    <input
                        type="text"
                        value={newForm.dateOpen}
                        onChange={handleChange}
                        placeholder="Date Open YYYY-MM-DD" 
                        pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" 
                        title="YYYY-MM-DD or leave blank"
                        name="dateOpen"
                    />
                </label>
                <label>
                    <input
                        type="url"
                        value={newForm.url}
                        onChange={handleChange}
                        placeholder="URL"
                        name="url"
                    />
                </label>
                <label>
                    <input
                        type="text"
                        value={newForm.notes}
                        onChange={handleChange}
                        placeholder="lorem ipsum"
                        name="notes"
                    />
                </label>
                <div>
                <label> Applied:&nbsp;
                    <input 
                        type="checkbox"
                        value={newForm.applied} 
                        onChange={handleChange}
                        name="applied"
                        />
                </label>
                <label> Awarded Grant:&nbsp;
                    <input 
                        type="checkbox"
                        value={newForm.succeeded} 
                        onChange={handleChange}
                        name="succeeded"
                        />
                </label>
                </div>
                <input className="submit" type="submit" value="Submit" />
            </form>
            </div>
            <div className='index-list'>
            <h2 style={styleObj}>
                Grants:
            </h2>
            { grants ? loaded() : loading() }
            </div>
        </section>
    )
    
}

export default Grants;