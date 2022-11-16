import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';

function Show({ people, deletePeople, updatePeople }) {
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const { id } = useParams();
    const person = people ? people.find(p => p._id === id) : null;
    const navigate = useNavigate();
    const [editForm, setEditForm] = useState({
        name: '',
        title: '',
        image: '',
        organization: '',
        email: '',
        phoneNumber: '',
        relationship: '',
        COC: true,
        notes: '',
        createdByUserId: '',
    });
    
    const [isEditing, setIsEditing] = useState(false);
    
    const handleEdit = () => {
        handleCloseEdit();
        setIsEditing(prevState => !prevState);
    };

    const handleDelete = () => {
            deletePeople(person._id)
            navigate('/');
    };
    
    const handleChange = (e) => {
        handleCheckClick();
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsEditing(false)
        alert('Updated!')
        updatePeople(editForm, id);
    };

    const handleOpenEdit = () => setOpenEdit(true);

    const handleCloseEdit = () => setOpenEdit(false);

    const handleOpenDelete = () => setOpenDelete(true);

    const handleCloseDelete = () => setOpenDelete(false);

    const handleCheckClick = () => {
        let COCbool = !editForm.COC;
        setEditForm({ COC: COCbool});
    };
    
    const loading = () => {
        return <h1>Loading ...</h1>
    };

    const loaded = () => {
    
            return(
                <section className="show-content" id={person.name}>
                <h1 className='show-title'>{person.name}</h1>
                <img className='avatar-image' src={person.image} alt={person.name} />
                <h3>{person.title} at {person.organization}</h3>
                <h3>Email: {person.email ? <>{person.email}</> : <>N/A</>}</h3>
                <h3>Phone: {person.phoneNumber ? <>{person.phoneNumber}</> : <>N/A</>}</h3>
                <h3>{person.COC ? <>COC organization</> : <>Non-COC organization</>}</h3>
                <h3>{person.relationship}</h3>
                {person.notes ? <h3>{person.notes}</h3> : null}
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
                                Are you sure you want to edit {person.name}?
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
                                Are you sure you want to delete {person.name}?
                            </p>
                            <button className='confirm' onClick={handleDelete}>Yes</button>
                            <button className='cancel' onClick={handleCloseDelete}>Cancel</button>
                        </Box>
                    </Modal>
            </section>
        )
    };
    
    useEffect(() => {
        if(person) {
            setEditForm(person)
        }
    }, [person]);

    return (
        <section>
            <div className='show-container'>
            { people ? loaded() : loading() }
            {isEditing && 
            <form onSubmit={handleSubmit}>
                <label>Name: <br />
                    <input 
                        type="text"
                        value={editForm.name} 
                        onChange={handleChange}
                        placeholder="Name"
                        name="name"
                        />
                </label>
                <label>Title: <br />
                    <input 
                        type="text"
                        value={editForm.title} 
                        onChange={handleChange}
                        placeholder="Job-title"
                        name="title"
                        />
                </label>
                <label>Image: <br />
                    <input 
                        type="text"
                        value={editForm.image} 
                        onChange={handleChange}
                        placeholder="https://your-person-image.com/file.jpeg"
                        name="image"
                        />
                </label>
                <label>Organization: <br />
                    <input 
                        type="text"
                        value={editForm.organization} 
                        onChange={handleChange}
                        placeholder="Company"
                        name="organization"
                        />
                </label>
                <label>Email: <br />
                    <input 
                        type="email"
                        value={editForm.email} 
                        onChange={handleChange}
                        placeholder="contact@email.com"
                        name="email"
                        />
                </label>
                <label>Phone Number: <br />
                    <input 
                        type="tel"
                        value={editForm.phoneNumber} 
                        onChange={handleChange}
                        placeholder="(XXX)-XXX-XXXX"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        name="phoneNumber"
                        />
                </label>
                <label>Relationship: <br />
                    <input 
                        type="text"
                        value={editForm.relationship} 
                        onChange={handleChange}
                        placeholder="Relationship"
                        name="relationship"
                        />
                </label>
                <label>Notes: <br />
                    <input 
                        type="text"
                        value={editForm.notes} 
                        onChange={handleChange}
                        placeholder="lorem ipsum"
                        name="notes"
                        />
                </label>
                <label>COC:
                    <input 
                        type="checkbox"
                        defaultChecked={editForm.COC}
                        onChange={handleCheckClick}
                        name="COC"
                        />
                </label>
                <input type="submit" value="Submit" />
            </form>
            }
            </div>
        </section>
    );
};

export default Show;