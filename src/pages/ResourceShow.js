import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import { Modal } from '@mui/material';

function ResourceShow({ resources, deleteResources, updateResources }) {
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
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

    const handleOpenEdit = () => setOpenEdit(true);

    const handleCloseEdit = () => setOpenEdit(false);

    const handleOpenDelete = () => setOpenDelete(true);

    const handleCloseDelete = () => setOpenDelete(false);
    
    const handleEdit = () => {
        handleCloseEdit();
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
    
    const loading = () => {
        return <h1>Loading ...</h1>
    };

    const loaded = () => {
    
            return(
                <section className="show-content" id={resource.name}>
                <h1 className='show-title'>{resource.name}</h1>
                <h3>Description: {resource.description}</h3>
                <h3><a href={resource.url}>{resource.url.slice(8)}</a></h3>
                <button className='edit' onClick={isEditing ? handleEdit : handleOpenEdit}>{isEditing ? 'Cancel' : 'Edit'}</button>
                    <Modal
                        open={openEdit}
                        onClose={handleCloseEdit}  
                        aria-labelledby="parent-modal-title"
                        aria-describedby="parent-modal-description" 
                    >
                        <Box>
                            <h2 id="parent-modal-title">Confirm Edit</h2>
                            <p>
                                Are you sure you want to edit {resource.name}?
                            </p>
                            <button className='confirm' onClick={handleEdit}>Yes</button>
                            <button className='cancel' onClick={handleCloseEdit}>Cancel</button>
                        </Box>
                    </Modal>
                <button className='delete' onClick={handleOpenDelete}>Delete</button>
                    <Modal
                        open={openDelete}
                        onClose={handleCloseDelete}  
                        aria-labelledby="parent-modal-title"
                        aria-describedby="parent-modal-description" 
                    >
                        <Box>
                            <h2 id="parent-modal-title">Confirm Delete</h2>
                            <p>
                                Are you sure you want to delete {resource.name}?
                            </p>
                            <button className='confirm' onClick={handleDelete}>Yes</button>
                            <button className='cancel' onClick={handleCloseDelete}>Cancel</button>
                        </Box>
                    </Modal>
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
                <input className='submit' type="submit" value="Submit" />
            </form>
            }
            </div>
        </section>
    );
};

export default ResourceShow;