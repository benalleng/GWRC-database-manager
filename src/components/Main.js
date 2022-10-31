import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Index from "../pages/Index";
import Show from "../pages/Show";
import Grants from '../pages/Grants';
import Resources from '../pages/Resources';
import Home from '../pages/Home';

function PrivatePageContainer( {children, user} ) {
    return user ? children : <Navigate to="/" />
}

function Main({user}) {
    const [people, setPeople ] = useState(null);

    const API_URL = 'http://localhost:4000/api/people/'

    const getData = async () => {
        if(!user) return;
        try {
            const token = await user.getIdToken();
            // console.log(token);
            const response = await fetch(API_URL, {
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
            await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-type': 'Application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(person)
            });
            getData();
        } catch (error) {
            // TODO handle errors
        }
    }

    const deletePeople = async (id) => {
        if (!user) return;
        try {
            const token = await user.getIdToken();
            await fetch(API_URL + id, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            getData();
        } catch (error) {
            // TODO handle errors
            console.log(error);
        }
    }

    const updatePeople = async (updatedPerson, id) => {
        if (!user) return;
        try {
            const token = await user.getIdToken();
            await fetch(API_URL + id, {
                method: 'PUT',
                headers: {
                    'Content-type': 'Application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(updatedPerson)
            });
            getData();
        } catch (error) {
            // TODO handle errors
            console.log(error);
        }
    }

    useEffect(() => {
        user ? getData() : setPeople(null);
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
                        grant={people}
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
                <Route path='/resources/:page' element={
                    <Resources 
                        user={user}
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