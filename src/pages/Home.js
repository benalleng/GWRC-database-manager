import { useState } from "react";
import { Link } from "react-router-dom";

function Home({ people, user, sortPeopleAlphabetical }) {
    const [searchValue, setSearchValue] = useState("");

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
        const searchPeople = people.filter((person) => {
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
        return (
            <div>
                {searchPeople.map((person) => (
                    <div className={(person.name === 'Ben Allen') ? "special" : "person"} key={person._id}>
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
                <label>Search for</label>
            </h2>
                    <select>
                        <option value="contacts">Contacts</option>
                        <option value="grants">Grants</option>
                        <option value="resources">Resources</option>
                    </select>
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
            <h2 style={styleObj}>
                Contacts:
            </h2>
            { people ? loaded() : loading()}
            </div>
        </section>
    )
}

export default Home;