import styles from './SearchResult.module.css'

const SearchResult = (props) => {

    const findAuthor = (book) => {
        if (book.volumeInfo.authors) {
            const authors = book.volumeInfo.authors.map(author => author);
            return authors.join(', ');
        } else {
            return 'n/a';
        };
    };
    const findGenre = (book) => {
        if (book.volumeInfo.categories) {
            const genres = book.volumeInfo.categories.map(genre => genre);
            return genres.join(', ');
        } else {
            return 'n/a';
        };
    };


    return props.searchData.map((book, idx) => {
        const databaseObject = { 
            title: book.volumeInfo.title, 
            author: findAuthor(book), 
            book_id: book.id, 
            have_read: false,
            genre: findGenre(book),
        };
        const alreadyReadObject = { 
            title: book.volumeInfo.title, 
            author: findAuthor(book), 
            book_id: book.id, 
            have_read: true,
            genre: findGenre(book),
        };
        if (book.volumeInfo.imageLinks) {
            return(
                <div className={styles.searchResult} key={idx}>
                    <img src={book.volumeInfo.imageLinks.smallThumbnail} alt={`${book.volumeInfo.title} cover`}/>
                    <div className={styles.titleAuthor}>
                        <p>{book.volumeInfo.title}</p>
                        <p> by {findAuthor(book)}</p>
                    </div>
                    <div className={styles.addButton}>
                        <button 
                            onClick={() => {props.addBookToList(databaseObject)}}
                        >Add to reading list</button>
                        <button 
                            onClick={() => {props.addBookToList(alreadyReadObject)}}
                        >Done reading!</button>
                    </div>
                </div>
            )
        } else {
            return(
                <div className={styles.searchResult} key={idx}>
                    <img
                        src={process.env.PUBLIC_URL + 'bookicon2.jpeg'}
                        className={styles.bookIcon}
                        alt='No book cover found'
                    />
                    <div className={styles.titleAuthor}>
                        <p>{book.volumeInfo.title}</p>
                        <p> by {findAuthor(book)}</p>
                    </div>
                    <div className={styles.addButton}>
                        <button 
                            onClick={() => {props.handleAddToWants(databaseObject)}}
                        >Add to reading list</button>
                        <button 
                            onClick={() => {props.handleAddToReads(alreadyReadObject)}}
                        >Done reading!</button>
                    </div>
                </div>
            )
        }
    })
}

export default SearchResult