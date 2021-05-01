import { useState } from 'react';
import Form from '../Form/Form';

const ListItem = props => {

    const [editFormVisible, setEditFormVisible] = useState(false);

    const toggleForm = () => {
        setEditFormVisible(!editFormVisible);
    };

    return (
        <>
            {
                editFormVisible ? 
                <Form 
                editFormVisible={editFormVisible}
                toggleForm={toggleForm}
                handleUpdate={props.handleUpdate}
                book={props.book}
                />
                :
                <div className='list-item'> 
                    <p className='list-title'>{props.book.title}</p>
                    <p className='list-author'> by {props.book.author}</p>
                    <div className='list-buttons'>
                        <img 
                            className='delete-button'
                            src={process.env.PUBLIC_URL + 'erasericon.png'}
                            onClick={() => props.handleDelete(props.book.id)} 
                        />
                        <button 
                            className='btn btn-primary edit-button'
                            onClick={toggleForm}>
                            Edit
                        </button>
                        {
                            props.book.have_read ?
                                <img 
                                    className='arrow-right'
                                    src={process.env.PUBLIC_URL + 'right-arrow.png'}
                                    onClick={() => props.changeToWant(props.book.id)}
                                />
                            :
                                <img
                                    className='arrow-left'
                                    src={process.env.PUBLIC_URL + 'left-arrow.png'}
                                    onClick={() => props.changeToRead(props.book.id)}
                                />
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default ListItem;