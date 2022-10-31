import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function TitleShow() {
    // const { id } = useParams();
    // const person = people ? people.find(p => p._id === id) : null;

    // const loading = () => {
        return <h1>GWRC | George Washington Regional Commission</h1>
    // };

    // const loaded = () => {
    //     <>
    //         {person.name} | George Washington Regional Commission
    //     </>
    // }

    // useEffect(() => {
    // }, []);

    // return(
    //     <>
    //         { people ? loaded() : loading() }
    //     </>
    // )
}

export default TitleShow;