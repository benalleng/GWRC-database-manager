import { useState } from "react";
import { Link } from "react-router-dom";

function Home({ people, grants, resources, user, sortPeopleAlphabetical }) {
    const [searchValue, setSearchValue] = useState("");
    // const [searchGrants, setsearchValue] = useState("");
    // const [searchResources, setsearchValue] = useState("");

    if(!user) return (
        <div className='login-placeholder'>
            <h1>Please Login to see your contacts</h1>
        </div>
    );

    const styleObj = {
        fontFamily: 'Lora',
        color: '#d09910',
        fontSize: '30px',
    }

    const loaded = () => {
        people = sortPeopleAlphabetical(people)
        const searchPerson = people.filter((person) => {
            if (searchValue === "") {
                return person;
            } else if (person.name.toLowerCase().includes(searchValue.toLowerCase())) {
                return person;
            } else if (person.title.toLowerCase().includes(searchValue.toLocaleLowerCase())) {
                return person;
            } else if (person.organization.toLowerCase().includes(searchValue.toLocaleLowerCase())) {
                return person;
            } else if (person.email.toLowerCase().includes(searchValue.toLocaleLowerCase())) {
                return person;
            } else if (person.phoneNumber.toLowerCase().includes(searchValue.toLocaleLowerCase())) {
                return person;
            }
          })
          const searchGrant = grants.filter((grant) => {
            if (searchValue === "") {
                return grant;
            } else if (grant.name.toLowerCase().includes(searchValue.toLowerCase())) {
                return grant;
            } else if (grant.organization.toLowerCase().includes(searchValue.toLocaleLowerCase())) {
                return grant;
            } else if (grant.dateDue.toLowerCase().includes(searchValue.toLocaleLowerCase())) {
                return grant;
            }
          })
          const searchResource = resources.filter((resource) => {
            if (searchValue === "") {
                return resource;
            } else if (resource.name.toLowerCase().includes(searchValue.toLowerCase())) {
                return resource;
            }
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
                        {grant.organization}
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
                </div>
                ))}
            </div> 
        )
    }
    const loading = () => {
        return <h1>Loading ...</h1>;
    };

    return (
        <section className="Home">
        <div className="top-main">
            <h2 style={styleObj}>
                <span className="red-create">Search for</span> Contacts, Grants, or Resources
            </h2>
            <input
                style={{ width: "30%", height: "25px" }}
                type="text"
                placeholder="Search..."
                title={`Search for:
Name,
Title,
Organization,
Email,
Phone Number`}
                onChange={(e) => setSearchValue(e.target.value)}
                />
            </div>
            <div className="index-list">
            { people ? loaded() : loading()}
            </div>
        </section>
    )
}

export default Home;