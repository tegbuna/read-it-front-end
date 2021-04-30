import styles from './Lists.module.css'
import { useState } from 'react';
import Form from '../Form/Form';

const WantList = (props) => {

    const [editFormVisible, setEditFormVisible] = useState(false);

    const toggleForm = () => {
        setEditFormVisible(!editFormVisible);
    };

    if (props.getBooks.books.length > 0) {
        return props.getBooks.books.map((book, idx) => {
            if (book.have_read == false) {
                return(
                    <>
                        {
                            editFormVisible ? 
                            <Form 
                                editFormVisible={editFormVisible}
                                toggleForm={toggleForm}
                                handleUpdate={props.handleUpdate}
                                book={book}
                            />
                            :
                            <div className={styles.listItem}> 
                                <p>{book.title}</p>
                                <p> by {book.author}</p>
                                <button onClick={() => props.handleDelete(book.id)}>X</button>
                                <button onClick={toggleForm}>Edit</button>
                            </div>
                        }
                    </>
                )
            }
        })
    } else {
        return <p></p>
    }
}

export default WantList