import ReadList from '../ReadAndWantLists/ReadList'
import WantList from '../ReadAndWantLists/WantList'
import styles from './BookLists.module.css'

const BookLists = (props) => {

    const changeToRead = async (bookId) => {
        try {
            let specificBook = props.getBooks.books.find(book => book.id === bookId);
            specificBook.have_read = true;
            await fetch(`http://read-it-back.herokuapp.com/books/${bookId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify(specificBook)
            });
            const bookIdx = props.getBooks.books.findIndex(book => book.id === bookId);
            const updatedBookArray = props.getBooks.books;
            updatedBookArray.splice(bookIdx, 1, specificBook);
            props.setBooks({ books: updatedBookArray });
        } catch (error) {
            console.log(error);
        };
    };

    const changeToWant = async (bookId) => {
        try {
            let specificBook = props.getBooks.books.find(book => book.id === bookId);
            specificBook.have_read = false;
            await fetch(`http://read-it-back.herokuapp.com/books/${bookId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify(specificBook)
            });
            const bookIdx = props.getBooks.books.findIndex(book => book.id === bookId);
            const updatedBookArray = props.getBooks.books;
            updatedBookArray.splice(bookIdx, 1, specificBook);
            props.setBooks({ books: updatedBookArray });
        } catch (error) {
            console.log(error);
        };
    };

    return (
        <div className={styles.containerContainer}>
            <div className={styles.listsBackground}>
                <div className={styles.readsWants}>
                    <p className={styles.readsTitle}>Books I've read...</p>
                    <p className={styles.wantsTitle}>...Books I will read</p>
                </div>
                <div className={styles.listsContainer}>
                    <div className={styles.readList}>
                        <ReadList 
                        getBooks={props.getBooks}
                        handleUpdate={props.handleUpdate}
                        handleDelete={props.handleDelete}
                        changeToWant={changeToWant}
                        />
                    </div>
                    <div className={styles.wantList}>
                        <WantList 
                        getBooks={props.getBooks}
                        handleUpdate={props.handleUpdate}
                        handleDelete={props.handleDelete}
                        changeToRead={changeToRead}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookLists