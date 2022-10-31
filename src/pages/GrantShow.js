import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function GrantShow({ grants, deleteGrants, updateGrants }) {
    const { id } = useParams();
    const grant = grants ? grants.find(p => p._id === id) : null;
    const navigate = useNavigate();
    const [editForm, setEditForm] = useState({
        name: '',
        organization: '',
        description: '',
        dateDue: '',
        dateOpen: '',
        applied: true,
        url: '',
        createdByUserId: '',
    });
    
    const [isEditing, setIsEditing] = useState(false);
    
    const handleEdit = () => {
        setIsEditing(prevState => !prevState);
    };

    const handleDelete = () => {
            deleteGrants(grant._id)
            navigate('/');
    };
    
    const handleChange = (e) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsEditing(false)
        alert('Updated!')
        updateGrants(editForm, id);
    };
    
    const handleConfirm = () => {
        const confirmBox = window.confirm(
            `Are you sure you want to delete ${grant.name}?`
        )
        if (confirmBox === true) {
            handleDelete();
        }
    };

    const handleConfirmEdit = () => {
        const confirmBox = window.confirm(
            `Are you sure you want to edit ${grant.name}?`
        )
        if (confirmBox === true) {
            handleEdit();
        }
    };

    const handleCheckClick = () => {
        let appliedbool = !editForm.applied;
        setEditForm({ applied: appliedbool});
    };
    
    const loading = () => {
        return <h1>Loading ...</h1>
    };

    const loaded = () => {
    
            return(
                <section id={grant.name}>
                <h1 className='show-title'>{grant.name}</h1>
                <h3>from {grant.organization}</h3>
                <h3>Description: {grant.description}</h3>
                <h3>Due Date: {grant.dateDue}</h3>
                <h3>Date Open: {grant.dateOpen}</h3>
                <h3>{grant.applied ? <span className='applied-check'>Applied</span> : <span className='applied-check'>Not Applied</span>}</h3>
                <h3><a href={grant.url}></a></h3>
                <button onClick={isEditing ? handleEdit : handleConfirmEdit}>{isEditing ? 'Cancel' : 'Edit'}</button>
                <button onClick={handleConfirm}>Delete</button>
            </section>
        )
    };
    
    useEffect(() => {
        if(grant) {
            setEditForm(grant)
        }
    }, [grant]);

    return (
        <section>
            <div className='show-container'>
            { grants ? loaded() : loading() }
            {isEditing && 
            <form onSubmit={handleSubmit}>
                <label>Name:
                    <input 
                        type="text"
                        value={editForm.name} 
                        onChange={handleChange}
                        placeholder="Name"
                        name="name"
                        />
                </label>
                <label>Organization:
                    <input 
                        type="text"
                        value={editForm.organization} 
                        onChange={handleChange}
                        placeholder="Organization"
                        name="organization"
                        />
                </label>
                <label>Description:
                    <input 
                        type="text"
                        value={editForm.organization} 
                        onChange={handleChange}
                        placeholder="Description"
                        name="description"
                        />
                </label>
                <label>Due Date:
                    <input 
                        type="date"
                        value={editForm.dateDue} 
                        onChange={handleChange}
                        placeholder="mmm-dd-YYYY"
                        pattern='[0-9]{2}-[0-9]{2}-[0-9]{4}'
                        name="dateDue"
                        />
                </label>
                <label>dateOpen:
                    <input 
                        type="date"
                        value={editForm.dateOpen} 
                        onChange={handleChange}
                        placeholder="mmm-dd-YYYY"
                        pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}"
                        name="dateDue"
                        />
                </label>
                <label>Applied:
                    <input 
                        type="checkbox"
                        defaultChecked={editForm.applied}
                        onChange={handleCheckClick}
                        name="applied"
                        />
                </label>
                <label>URL:
                    <input 
                        type="text"
                        value={editForm.url} 
                        onChange={handleChange}
                        placeholder="https://grant-website.com"
                        name="url"
                        />
                </label>
                <input type="submit" value="Submit" />
            </form>
            }
            </div>
        </section>
    );
};

export default GrantShow;