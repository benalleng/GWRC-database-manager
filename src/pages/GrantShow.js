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
        let succeededBool = !editForm.succeeded;
        setEditForm({ succeeded: succeededBool});
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
                <h3>Date Open: {grant.dateOpen ? grant.dateOpen : <>N/A</>}</h3>
                <h3>Due Date: {grant.dateDue ? grant.dateDue : <>N/A</>}</h3>
                <h3>{grant.applied ? <>Applied On: {grant.applied}</> : <>Not Applied</>}</h3>
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
                    title="Grant Name"
                />
            </label>
            <label>
                <input
                    type="text"
                    value={editForm.organization}
                    onChange={handleChange}
                    placeholder="Organiztion"
                    name="organization"
                    title="Grantor"
                />
            </label>
            <label>
                <input
                    type="text"
                    value={editForm.description}
                    onChange={handleChange}
                    placeholder="Description"
                    name="description"
                    title="Description"
                />
            </label>
            <label>
                <input
                    type="date"
                    value={editForm.dateOpen}
                    onChange={handleChange}
                    name="dateOpen"
                    title="Application Open Date"
                />
            </label>
            <label>
                <input
                    type="date"
                    value={editForm.dateDue}
                    onChange={handleChange}
                    name="dateDue"
                    title="Application Due Date"
                />
            </label>
            <label>
                <input
                    type="url"
                    value={editForm.url}
                    onChange={handleChange}
                    placeholder="URL"
                    name="url"
                    title="Grant info URL"
                />
            </label>
            <label>
                <input
                    type="text"
                    value={editForm.notes}
                    onChange={handleChange}
                    placeholder="lorem ipsum"
                    name="notes"
                    title="Notes"
                />
            </label>
            <div>
                <label>
                    <input 
                        type="date"
                        defaultChecked={editForm.applied} 
                        onChange={handleChange}
                        placeholder="Date applied"
                        name="applied"
                        title="Date applied"
                        />
                </label>
                <label> Awarded Grant:&nbsp;
                    <input 
                        type="checkbox"
                        defaultChecked={editForm.succeeded} 
                        onChange={handleCheckClick}
                        name="succeeded"
                        title="Successfully Awarded Grant?"
                        />
                </label>
            </div>
            <input className="submit" type="submit" value="Submit" />
        </form>
            }
            </div>
        </section>
    );
};

export default GrantShow;