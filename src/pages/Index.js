import { Link, useParams } from 'react-router-dom';

import { useState } from 'react';

import { Pagination } from '../components/Pagination';

function Index({ people, user, createPeople, sortPeopleAlphabetical }) {

    const { page } = useParams();

    const [currentPage, setCurrentPage] = useState(page);
    const [postsPerPage] = useState(15);

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
            <h1>Please Login to see your Contacts</h1>
        </div>
    );

    const loaded = () => {
        people = sortPeopleAlphabetical(people)
        const currentPeople = people.slice(indexOfFirstPost, indexOfLastPost)
        return (
            <div>
            {currentPeople.map(person => (
                <div className={(person.name === 'Ben Allen') ? "special" : "person"} key={person._id}>
                    <h2>
                        <Link to={`/contacts/contact/${person._id}`}>
                            {person.name}
                        </Link>
                    </h2>
                    <h4 className='person-job'>
                        <span className='person-title'>{person.title} at </span><span className='person-org'>{person.organization}</span>
                    </h4>
                </div>
            ))}
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={people.length}
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

    const handleCheckClick = () => {
        let COCbool = !newForm.COC;
        setNewForm({ COC: COCbool});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!newForm.image) delete newForm.image
        createPeople(newForm);
        setNewForm({
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
    };

    return (
        <section className="Index">
            <div className="top-main">
            <h2 style={styleObj}>
                <span className='red-create'>Create </span>New Contact:
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
                        value={newForm.title} 
                        onChange={handleChange}
                        placeholder="Position / Title"
                        name="title"
                        />
                </label>
                <label>
                    <input 
                        type="text"
                        value={newForm.image} 
                        onChange={handleChange}
                        placeholder="http://image.com/file.jpeg"
                        name="image"
                        />
                </label>
                <label>
                    <input 
                        type="text"
                        value={newForm.organization} 
                        onChange={handleChange}
                        placeholder="Company / Organization"
                        name="organization"
                        />
                </label>
                <label>
                    <input 
                        type="email"
                        value={newForm.email} 
                        onChange={handleChange}
                        placeholder="contact@email.com"
                        name="email"
                        />
                </label>
                <label>
                    <input 
                        type="tel"
                        value={newForm.phoneNumber} 
                        onChange={handleChange}
                        placeholder="XXX-XXX-XXXX"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        name="phoneNumber"
                    />
                </label>
                <label>
                    <input 
                        type="text"
                        value={newForm.relationship} 
                        onChange={handleChange}
                        placeholder="Relationship"
                        name="relationship"
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
                    <label hidden> COC:&nbsp;
                        <input 
                            type="checkbox"
                            defaultChecked={newForm.COC} 
                            onChange={handleCheckClick}
                            name="COC"
                            />
                    </label>
                    <input className="submit" type="submit" value="Submit" />
            </form>
            </div>
            <div className='index-list'>
            <h2 style={styleObj}>
                Contacts:
            </h2>
            { people ? loaded() : loading() }
            </div>
        </section>
    )
    
}

export default Index;