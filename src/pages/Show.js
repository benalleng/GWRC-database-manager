import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Show({ people, deletePeople, updatePeople }) {
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
        setIsEditing(prevState => !prevState);
    };

    const handleDelete = () => {
            deletePeople(person._id)
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
        updatePeople(editForm, id);
    };
    
    const handleConfirm = () => {
        const confirmBox = window.confirm(
            `Are you sure you want to delete ${person.name}?`
        )
        if (confirmBox === true) {
            handleDelete();
        }
    };

    const handleConfirmEdit = () => {
        const confirmBox = window.confirm(
            `Are you sure you want to edit ${person.name}?`
        )
        if (confirmBox === true) {
            handleEdit();
        }
    };

    const handleCheckClick = () => {
        let COCbool = !editForm.COC;
        setEditForm({ COC: COCbool});
    };
    
    const loading = () => {
        return <h1>Loading ...</h1>
    };

    const loaded = () => {
    
            return(
                <section id={person.name}>
                <h1 className='show-title'>{person.name}</h1>
                <img className='avatar-image' src={person.image} alt={person.name} />
                <h3>{person.title} at {person.organization}</h3>
                <h3>Email: {person.email}</h3>
                <h3>Phone: {person.phoneNumber}</h3>
                <h3>{person.COC ? <>COC organization</> : <>Non-COC organization</>}</h3>
                <h3>{person.relationship}</h3>
                {person.notes ? <h3>Notes: {person.notes}</h3> : null}
                <button onClick={isEditing ? handleEdit : handleConfirmEdit}>{isEditing ? 'Cancel' : 'Edit'}</button>
                <button onClick={handleConfirm}>Delete</button>
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
                <label>Name:
                    <input 
                        type="text"
                        value={editForm.name} 
                        onChange={handleChange}
                        placeholder="Name"
                        name="name"
                        />
                </label>
                <label>Title:
                    <input 
                        type="text"
                        value={editForm.title} 
                        onChange={handleChange}
                        placeholder="Job-title"
                        name="title"
                        />
                </label>
                <label>Image:
                    <input 
                        type="text"
                        value={editForm.image} 
                        onChange={handleChange}
                        placeholder="https://your-person-image.com/file.jpeg"
                        name="image"
                        />
                </label>
                <label>Organization:
                    <input 
                        type="text"
                        value={editForm.organization} 
                        onChange={handleChange}
                        placeholder="Company"
                        name="organization"
                        />
                </label>
                <label>Email:
                    <input 
                        type="email"
                        value={editForm.email} 
                        onChange={handleChange}
                        placeholder="contact@email.com"
                        name="email"
                        />
                </label>
                <label>Phone Number:
                    <input 
                        type="tel"
                        value={editForm.phoneNumber} 
                        onChange={handleChange}
                        placeholder="(XXX)-XXX-XXXX"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        name="phoneNumber"
                        />
                </label>
                <label>Relationship:
                    <input 
                        type="text"
                        value={editForm.relationship} 
                        onChange={handleChange}
                        placeholder="Relationship"
                        name="relationship"
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
                <label>Notes:
                    <input 
                        type="text"
                        value={editForm.notes} 
                        onChange={handleChange}
                        placeholder="lorem ipsum"
                        name="notes"
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