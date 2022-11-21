import { Navigate } from "react-router-dom";

function Home({user, people, grants, resources}) {

    const styleObj = {
        fontFamily: 'Lora',
        color: '#c9000f',
        fontSize: '30px',
    }

    if(!user) {
        return (
        <div className='login-placeholder'>
            <h1 style={styleObj}>Please Login</h1>
        </div>
        )
    }

    const loaded = () => {
        return (
            <Navigate to="/search" />
        )
    }

    const loading = () => {
        return <h1 style={styleObj} className='loading'>Loading...</h1>
    }

    return (
        <>
        {(people && grants && resources) ? loaded() : loading()}
        </>
    )

    // return (
    //     <div className="index-list">
    //             <h2 style={styleObj}>
    //                 Please Login
    //             </h2>
    //     </div>
    // )
}

export default Home;