import ListItem from '../ListItem/ListItem';

const WantList = (props) => {

    if (props.getBooks.books.length > 0) {
        return props.getBooks.books.map((book, idx) => {
            if (book.have_read === false) {
                return(
                    <ListItem 
                        key={idx}
                        book={book}
                        handleDelete={props.handleDelete}
                        handleUpdate={props.handleUpdate}
                        changeRead={props.changeRead}
                    />
                )
            }
        })
    } else {
        return <p></p>
    }
}

export default WantList