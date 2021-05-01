import { useState } from 'react';
import Form from '../Form/Form';
import styles from '../ReadAndWantLists/Lists.module.css';

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
                <div className={styles.listItem}> 
                    <p>{props.book.title}</p>
                    <p> by {props.book.author}</p>
                    <div className='list-buttons'>
                        <button 
                            className='btn btn-danger delete-button'
                            onClick={() => props.handleDelete(props.book.id)}>
                            X
                        </button>
                        <button 
                            className='btn btn-secondary edit-button'
                            onClick={toggleForm}>
                            Edit
                        </button>
                        {
                            props.book.have_read ?
                                <img 
                                    className='arrow-right'
                                    src={process.env.PUBLIC_URL + 'right-arrow.png'}
                                    onClick={() => props.changeToWant(props.book.id)}>
                                </img>
                            :
                                <img 
                                    className='arrow-left'
                                    src={process.env.PUBLIC_URL + 'left-arrow.png'}
                                    onClick={() => props.changeToRead(props.book.id)}>
                                </img>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default ListItem;