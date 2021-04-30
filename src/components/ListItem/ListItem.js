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
                    <button onClick={() => props.handleDelete(props.book.id)}>X</button>
                    <button onClick={toggleForm}>Edit</button>
                    {
                        props.book.have_read ?
                            <button onClick={() => props.changeToWant(props.book.id)}>++</button>
                        :
                            <button onClick={() => props.changeToRead(props.book.id)}>--</button>
                    }
                </div>
            }
        </>
    )
}

export default ListItem;