import { useState } from "react";
import { Link } from "react-router-dom";

function Search({ people, grants, resources, user, sortPeopleAlphabetical }) {
    let [searchValue, setSearchValue] = useState("");
    // const [searchGrants, setsearchValue] = useState("");
    // const [searchResources, setsearchValue] = useState("");


    const styleObj = {
        fontFamily: 'Lora',
        color: '#d09910',
        fontSize: '30px',
    }

    if(!user) return (
        <div className='login-placeholder'>
            <h1>Please Login to search</h1>
        </div>
    );

    const clearInput = (e) => {
        e.preventDefault();
        setSearchValue("");
    }

    const loaded = () => {
        people = sortPeopleAlphabetical(people)
        const searchPerson = people.filter((person) => {
            if (person.name.toLowerCase().includes(searchValue.toLowerCase())) {
                return person;
            } else if (person.title.toLowerCase().includes(searchValue.toLocaleLowerCase())) {
                return person;
            } else if (person.organization.toLowerCase().includes(searchValue.toLocaleLowerCase())) {
                return person;
            } else if (person.email.toLowerCase().includes(searchValue.toLocaleLowerCase())) {
                return person;
            } else if (person.phoneNumber.toLowerCase().includes(searchValue.toLocaleLowerCase())) {
                return person;
            } else return null;
          })
          const searchGrant = grants.filter((grant) => {
            if (grant.name.toLowerCase().includes(searchValue.toLowerCase())) {
                return grant;
            } else if (grant.organization.toLowerCase().includes(searchValue.toLocaleLowerCase())) {
                return grant;
            } else if (grant.description.toLowerCase().includes(searchValue.toLocaleLowerCase())){
                return grant;
            } else return null;
          })
          const searchResource = resources.filter((resource) => {
            if (resource.name.toLowerCase().includes(searchValue.toLowerCase())) {
                return resource;
            } else if (resource.description.toLowerCase().includes(searchValue.toLocaleLowerCase())){
                return resource;
            } else return null;
          })
        return (
            <div>
                {searchPerson.map((person) => (
                    <div className="person" key={person._id}>
                        <h2 key={person._id}>
                            <Link to={`/contacts/contact/${person._id}`}>
                                {person.name}
                            </Link>
                        </h2>
                        <h4 className='person-job'>
                            <span className='person-title'>{person.title} at </span><span className='person-org'>{person.organization}</span>
                        </h4>
                    </div>
                ))}
                {searchGrant.map(grant => (
                <div className={grant.applied === 'false' ? "grant" : "grant-applied"} key={grant._id}>
                    <h2>
                        <Link to={`/grants/grant/${grant._id}`}>
                            {grant.name}
                        </Link>
                    </h2>
                    <h4 className="grant-org">
                        Grant through {grant.organization}
                    </h4>
                </div>
                ))}
                {searchResource.map(resource => (
                <div className="resource" key={resource._id}>
                    <h2>
                        <Link to={`/resources/resource/${resource._id}`}>
                            {resource.name}
                        </Link>
                    </h2>
                    <h4 className="resource-marker">
                        Resource
                    </h4>
                </div>
                ))}
            </div> 
        )
    }
    const loading = () => {
        return <h1 className='loading'>Loading ...</h1>;
    };

    return (
        <section className="Home">
        <div className="top-main">
            <h2 style={styleObj}>
                <span className="red-create">Search</span> Contacts, Grants, or Resources
            </h2>
            <input
                style={{ width: "30%", height: "25px" }}
                type="text"
                value={searchValue}
                placeholder="Search..."
                title={`Search for:
Name,
Title,
Key-Words,
Email,
Phone Number`}
                onChange={(e) => setSearchValue(e.target.value)}
                />
                <button className="clear-input" onClick={clearInput}>X</button>
            </div>
            <div className="index-list">
            { (people && grants && resources) ? loaded() : loading()}
            </div>
        </section>
    )
}

export default Search;