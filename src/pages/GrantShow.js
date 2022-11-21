import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import { Modal } from '@mui/material';

function GrantShow({ grants, deleteGrants, updateGrants }) {
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
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

    const handleOpenEdit = () => setOpenEdit(true);

    const handleCloseEdit = () => setOpenEdit(false);

    const handleOpenDelete = () => setOpenDelete(true);

    const handleCloseDelete = () => setOpenDelete(false);
    
    const handleEdit = () => {
        handleCloseEdit();
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
        setIsEditing(false);
        updateGrants(editForm, id);
        handleClose();
    };

    const handleOpen = (e) => {
        e.preventDefault();
        setOpen(true);
    }
    
    const handleClose = () => setOpen(false);

    const handleCheckClick = () => {
        let succeededBool = !editForm.succeeded;
        setEditForm({ succeeded: succeededBool});
    };
    
    const loading = () => {
        return <h1 className='loading'>Loading ...</h1>
    };

    const loaded = () => {
    
            return(
                <section className="show-content" id={grant.name}>
                <h1 className='show-title'>{grant.name}</h1>
                <h3>{grant.description? <>Grantor: {grant.organization}</> : null}</h3>
                <h3>{grant.description ? <>Description: {grant.description}</> : null}</h3>
                <h3>Date Open: {grant.dateOpen ? grant.dateOpen : <>N/A</>}</h3>
                <h3>Due Date: {grant.dateDue ? grant.dateDue : <>N/A</>}</h3>
                <h3>{grant.applied ? <>Date Applied: N/A</> : <>Date Applied: {grant.applied}</>}</h3>
                <h3>{grant.succeeded ? <>Succeeded</>: <>Not successful</>}</h3>
                <h3><a href={grant.url}>{grant.url.slice(8)}</a></h3>
                <h3>{grant.notes ? <>Notes: {grant.notes}</>: null}</h3>
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
                                Are you sure you want to edit {grant.name}?
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
                                Are you sure you want to delete {grant.name}?
                            </p>
                            <button className='confirm' onClick={handleDelete}>Yes</button>
                            <button className='cancel' onClick={handleCloseDelete}>Cancel</button>
                        </Box>
                    </Modal>
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
            <form onSubmit={handleOpen}>
            <label>Name: <br />
                <input
                    type="text"
                    value={editForm.name}
                    onChange={handleChange}
                    placeholder="Name"
                    name="name"
                    title="Grant Name"
                />
            </label>
            <label>Grantor: <br />
                <input
                    type="text"
                    value={editForm.organization}
                    onChange={handleChange}
                    placeholder="Organiztion"
                    name="organization"
                    title="Grantor"
                />
            </label>
            <label>Description: <br />
                <input
                    type="text"
                    value={editForm.description}
                    onChange={handleChange}
                    placeholder="Description"
                    name="description"
                    title="Description"
                />
            </label>
            <label>Date Open: <br />
                <input
                    type="date"
                    value={editForm.dateOpen}
                    onChange={handleChange}
                    name="dateOpen"
                    title="Application Open Date"
                />
            </label>
            <label>Date Due: <br />
                <input
                    type="date"
                    value={editForm.dateDue}
                    onChange={handleChange}
                    name="dateDue"
                    title="Application Due Date"
                />
            </label>
            <label>Date Applied: <br />
                <input 
                    type="date"
                    defaultChecked={editForm.applied} 
                    onChange={handleChange}
                    placeholder="Date applied"
                    name="applied"
                    title="Date applied"
                    />
            </label>
            <label>URL: <br />
                <input
                    type="url"
                    value={editForm.url}
                    onChange={handleChange}
                    placeholder="URL"
                    name="url"
                    title="Grant info URL"
                />
            </label>
            <label>Notes: <br />
                <input
                    type="text"
                    value={editForm.notes}
                    onChange={handleChange}
                    placeholder="lorem ipsum"
                    name="notes"
                    title="Notes"
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
            <button className='submit' onClick={handleOpen}>Submit</button>
                <Modal
                        open={open}
                        onClose={handleSubmit}  
                        aria-labelledby="parent-modal-title"
                        aria-describedby="parent-modal-description" 
                    >
                        <Box>
                            <h2 id="parent-modal-title">Updated</h2>
                            <p>
                                {grant.name} has been updated!
                            </p>
                            <button className='cancel' onClick={handleSubmit}>Ok</button>
                        </Box>
                    </Modal>
        </form>
            }
            </div>
        </section>
    );
};

export default GrantShow;