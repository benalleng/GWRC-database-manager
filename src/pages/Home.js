import { useState } from "react";
import { Link } from "react-router-dom";

function Home({ people, user, sortPeopleAlphabetical }) {
    const [searchValue, setSearchValue] = useState("");

    if(!user) return (
        <div className='login-placeholder'>
            <h1>Please Login to see your contacts</h1>
        </div>
    );

    const loaded = () => {
        people = sortPeopleAlphabetical(people)
        const searchPeople = people.filter((person) => {
            if (searchValue === "") {
                return "";
            } else if (person.name.toLowerCase().includes(searchValue.toLowerCase())) {
                return person;
            } else if (person.title.toLowerCase().includes(searchValue.toLocaleLowerCase())) {
                return person;
            }
          })
        return (
            <div>
                {searchPeople.map((person) => (
                    <div>
                        <h5 key={person._id}>
                            <Link to={`/contacts/contact/${person._id}`}>
                                {person.name}
                            </Link>
                        </h5>
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
        <div>
            <h3>Search Filter</h3>
            <input
                style={{ width: "30%", height: "25px" }}
                type="text"
                placeholder="Search..."
                onChange={(e) => setSearchValue(e.target.value)}
                />
            { people ? loaded() : loading()}
            </div>
        </section>
    )
}

export default Home;