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
        succeeded: true,
        url: '',
        notes: '',
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
                <section className="show-content" id={grant.name}>
                <h1 className='show-title'>{grant.name}</h1>
                <h3>{grant.description? <>Grantor: {grant.organization}</> : null}</h3>
                <h3>{grant.description ? <>Description: {grant.description}</> : null}</h3>
                <h3>Due Date: {grant.dateDue ? grant.dateDue : <>N/A</>}</h3>
                <h3>Date Open: {grant.dateOpen? grant.dateOpen : <>N/A</>}</h3>
                <h3>{grant.applied ? <>Applied</> : <>Not Applied</>}</h3>
                <h3>{grant.succeeded ? <>Succeeded</>: <>Not successful</>}</h3>
                <h3><a href={grant.url}>{grant.url.slice(8)}</a></h3>
                <h3>{grant.notes ? <>Notes: {grant.notes}</>: null}</h3>
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
            <label>
                <input
                    type="text"
                    value={editForm.name}
                    onChange={handleChange}
                    placeholder="Name"
                    name="name"
                />
            </label>
            <label>
                <input
                    type="text"
                    value={editForm.organization}
                    onChange={handleChange}
                    placeholder="Organiztion"
                    name="organization"
                />
            </label>
            <label>
                <input
                    type="text"
                    value={editForm.description}
                    onChange={handleChange}
                    placeholder="Description"
                    name="description"
                />
            </label>
            <label>
                <input
                    type="text"
                    value={editForm.dateOpen}
                    onChange={handleChange}
                    placeholder="Date Due YYYY-MM-DD"
                    pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" 
                    title="YYYY-MM-DD or leave blank"
                    name="dateDue"
                />
            </label>
            <label>
                <input
                    type="text"
                    value={editForm.dateDue}
                    onChange={handleChange}
                    placeholder="Date Open YYYY-MM-DD" 
                    pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" 
                    title="YYYY-MM-DD or leave blank"
                    name="dateOpen"
                />
            </label>
            <label>
                <input
                    type="text"
                    value={editForm.url}
                    onChange={handleChange}
                    placeholder="URL"
                    name="url"
                />
            </label>
            <label>
                <input
                    type="text"
                    value={editForm.notes}
                    onChange={handleChange}
                    placeholder="lorem ipsum"
                    name="notes"
                />
            </label>
            <label> Applied:&nbsp;
                <input 
                    type="checkbox"
                    value={editForm.applied} 
                    onChange={handleChange}
                    name="applied"
                />
            </label>
            <label> Awarded Grant:&nbsp;
                <input 
                    type="checkbox"
                    value={editForm.succeeded} 
                    onChange={handleChange}
                    name="succeeded"
                />
            </label>
            <input className="submit" type="submit" value="Submit" />
        </form>
            }
            </div>
        </section>
    );
};

export default GrantShow;