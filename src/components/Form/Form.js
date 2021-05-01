import { useState, useEffect } from 'react';

const Form = (props) => {
    const [formState, setFormState] = useState({
        title: '',
        author: ''
    });

    useEffect(() => {
        if (props.editFormVisible) {
            const { title, author, book_id, have_read, genre, description, id } = props.book;
            setFormState({
                title,
                author,
                book_id,
                have_read,
                genre,
                description,
                id
            });
        }
    }, [props.editFormVisible, props.book]);

    const handleChange = event => {
        setFormState(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (props.editFormVisible) {
            props.handleUpdate(formState);
            props.toggleForm();
        } else {
            props.handleAdd(formState);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                onChange={handleChange} 
                name='title' 
                type='text'
                placeholder='Book title'
                value={formState.title}
            />
            <input
                onChange={handleChange} 
                name='author'
                type='text'
                placeholder='Author'
                value={formState.author}
            />
            <input type='submit' value={props.editFormVisible ? 'Update' : 'Add'} />
        </form>
    )
}

export default Form;