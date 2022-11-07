import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ResourceShow({ resources, deleteResources, updateResources }) {
    const { id } = useParams();
    const resource = resources ? resources.find(p => p._id === id) : null;
    const navigate = useNavigate();
    const [editForm, setEditForm] = useState({
        name: '',
        description: '',
        url: '',
        createdByUserId: '',
    });
    
    const [isEditing, setIsEditing] = useState(false);
    
    const handleEdit = () => {
        setIsEditing(prevState => !prevState);
    };

    const handleDelete = () => {
            deleteResources(resource._id)
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
        updateResources(editForm, id);
    };
    
    const handleConfirm = () => {
        const confirmBox = window.confirm(
            `Are you sure you want to delete ${resource.name}?`
        )
        if (confirmBox === true) {
            handleDelete();
        }
    };

    const handleConfirmEdit = () => {
        const confirmBox = window.confirm(
            `Are you sure you want to edit ${resource.name}?`
        )
        if (confirmBox === true) {
            handleEdit();
        }
    };
    
    const loading = () => {
        return <h1>Loading ...</h1>
    };

    const loaded = () => {
    
            return(
                <section className="show-content" id={resource.name}>
                <h1 className='show-title'>{resource.name}</h1>
                <h3>Description: {resource.description}</h3>
                <h3><a href={resource.url}>{resource.url.slice(8)}</a></h3>
                <button onClick={isEditing ? handleEdit : handleConfirmEdit}>{isEditing ? 'Cancel' : 'Edit'}</button>
                <button onClick={handleConfirm}>Delete</button>
            </section>
        )
    };
    
    useEffect(() => {
        if(resource) {
            setEditForm(resource)
        }
    }, [resource]);

    return (
        <section>
            <div className='show-container'>
            { resources ? loaded() : loading() }
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
                <label>Description:
                    <input 
                        type="text"
                        value={editForm.description} 
                        onChange={handleChange}
                        placeholder="Description"
                        name="description"
                        />
                </label>
                <label>URL:
                    <input 
                        type="text"
                        value={editForm.url} 
                        onChange={handleChange}
                        placeholder="https://resource-website.com"
                        pattern="https?://.+" 
                        title="Include http://"
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

export default ResourceShow;