import { useState, useEffect } from 'react';

const Form = (props) => {
    const [formState, setFormState] = useState({
        title: '',
        author: ''
    });

    useEffect(() => {
        if (props.editFormVisible) {
            const { title, author } = props.book;
            setFormState({
                title,
                author
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
                handleChange={handleChange} 
                name='title' 
                value={formState.title}
                type='text'
                placeholder={props.book.title}
            />
            <input
                handleChange={handleChange} 
                name='author'
                value={formState.author}
                type='text'
                placeholder={props.book.author}
            />
            <input type='submit' value={props.editFormVisible ? 'Update' : 'Add'} />
        </form>
    )
}

export default Form;