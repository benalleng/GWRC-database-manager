import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Index from "../pages/Index";
import Show from "../pages/Show";
import Grants from '../pages/Grants';
import Resources from '../pages/Resources';
import Home from '../pages/Home';
import GrantShow from '../pages/GrantShow';

function PrivatePageContainer( {children, user} ) {
    return user ? children : <Navigate to="/" />
}

function Main({user}) {
    const [people, setPeople ] = useState(null);
    const [grants, setGrants ] = useState(null);
    const [resources, setResources] = useState(null);

    const PEOPLE_API_URL = 'http://localhost:4000/api/people/'
    const GRANTS_API_URL = 'http://localhost:4000/api/grants/'
    const RESOURCES_API_URL = 'http://localhost:4000/api/resources/'

    const getPeopleData = async () => {
        if(!user) return;
        try {
            const token = await user.getIdToken();
            // console.log(token);
            const response = await fetch(PEOPLE_API_URL, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            const data = await response.json();
            setPeople(data);
        } catch (error) {
            console.log(error);
            // TODO add logic to alert the user that something went wrong
            
        }
    }

    const createPeople = async (person) => {
        if (!user) return;
        try {
            const token = await user.getIdToken();
            await fetch(PEOPLE_API_URL, {
                method: 'POST',
                headers: {
                    'Content-type': 'Application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(person)
            });
            getPeopleData();
        } catch (error) {
            // TODO handle errors
        }
    }

    const deletePeople = async (id) => {
        if (!user) return;
        try {
            const token = await user.getIdToken();
            await fetch(PEOPLE_API_URL + id, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            getPeopleData();
        } catch (error) {
            // TODO handle errors
            console.log(error);
        }
    }

    const updatePeople = async (updatedPerson, id) => {
        if (!user) return;
        try {
            const token = await user.getIdToken();
            await fetch(PEOPLE_API_URL + id, {
                method: 'PUT',
                headers: {
                    'Content-type': 'Application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(updatedPerson)
            });
            getPeopleData();
        } catch (error) {
            // TODO handle errors
            console.log(error);
        }
    }

    const getGrantsData = async () => {
        if(!user) return;
        try {
            const token = await user.getIdToken();
            // console.log(token);
            const response = await fetch(GRANTS_API_URL, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            const data = await response.json();
            setGrants(data);
        } catch (error) {
            console.log(error);
            // TODO add logic to alert the user that something went wrong
            
        }
    }

    const createGrants = async (grant) => {
        if (!user) return;
        try {
            const token = await user.getIdToken();
            await fetch(GRANTS_API_URL, {
                method: 'POST',
                headers: {
                    'Content-type': 'Application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(grant)
            });
            getGrantsData();
        } catch (error) {
            // TODO handle errors
        }
    }

    const deleteGrants = async (id) => {
        if (!user) return;
        try {
            const token = await user.getIdToken();
            await fetch(GRANTS_API_URL + id, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            getGrantsData();
        } catch (error) {
            // TODO handle errors
            console.log(error);
        }
    }

    const updateGrants = async (updatedGrant, id) => {
        if (!user) return;
        try {
            const token = await user.getIdToken();
            await fetch(GRANTS_API_URL + id, {
                method: 'PUT',
                headers: {
                    'Content-type': 'Application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(updatedGrant)
            });
            getGrantsData();
        } catch (error) {
            // TODO handle errors
            console.log(error);
        }
    }

    const getResourcesData = async () => {
        if(!user) return;
        try {
            const token = await user.getIdToken();
            // console.log(token);
            const response = await fetch(RESOURCES_API_URL, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            const data = await response.json();
            setResources(data);
        } catch (error) {
            console.log(error);
            // TODO add logic to alert the user that something went wrong
            
        }
    }

    const createResources = async (resource) => {
        if (!user) return;
        try {
            const token = await user.getIdToken();
            await fetch(RESOURCES_API_URL, {
                method: 'POST',
                headers: {
                    'Content-type': 'Application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(resource)
            });
            getResourcesData();
        } catch (error) {
            // TODO handle errors
        }
    }

    const deleteResources = async (id) => {
        if (!user) return;
        try {
            const token = await user.getIdToken();
            await fetch(RESOURCES_API_URL + id, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            getResourcesData();
        } catch (error) {
            // TODO handle errors
            console.log(error);
        }
    }

    const updateResources = async (updatedResource, id) => {
        if (!user) return;
        try {
            const token = await user.getIdToken();
            await fetch(RESOURCES_API_URL + id, {
                method: 'PUT',
                headers: {
                    'Content-type': 'Application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(updatedResource)
            });
            getResourcesData();
        } catch (error) {
            // TODO handle errors
            console.log(error);
        }
    }

    useEffect(() => {
        user ? (getPeopleData() && getGrantsData() && getResourcesData()) : (setGrants(null) && setPeople(null) && setResources(null));
    }, [user]);

    return(
        <main>
            <Routes>
                <Route path="/contacts/:page" element={
                    <Index
                        user={user}
                        people={people} 
                        createPeople={createPeople} 
                    />
                } />
                <Route path="/grants/:page" element={
                    <Grants 
                        user={user}
                        grants={grants}
                        createGrants={createGrants}
                    />
                } />
                <Route path='/contacts/people/:id' element={
                <PrivatePageContainer user={user}>
                    <Show 
                        people={people} 
                        deletePeople={deletePeople}
                        updatePeople={updatePeople}
                    />
                </PrivatePageContainer>
                } />
                <Route path='/grants/grant/:id' element={
                <PrivatePageContainer user={user}>
                    <GrantShow 
                        grants={grants} 
                        deleteGrants={deleteGrants}
                        updateGrants={updateGrants}
                    />
                </PrivatePageContainer>
                } />
                <Route path='/resources/:page' element={
                    <Resources 
                        user={user}
                        resources={resources}
                        createResources={createResources}
                    />
                } />
                <Route path='/' element={
                    <Home/>
                } />
            </Routes>
        </main>

    )
}

export default Main;