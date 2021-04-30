import ListItem from '../ListItem/ListItem';

const ReadList = (props) => {

    if (props.getBooks.books.length > 0) {
        return props.getBooks.books.map((book, idx) => {
            if (book.have_read === true) {
                return(
                    <ListItem 
                        key={idx}
                        book={book}
                        handleDelete={props.handleDelete}
                        handleUpdate={props.handleUpdate}
                        changeToWant={props.changeToWant}
                    />
                )
            }
        })
    } else {
        return <p></p> 
    }
}

export default ReadList