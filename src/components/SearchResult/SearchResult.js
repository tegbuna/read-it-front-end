import styles from './SearchResult.module.css'

const SearchResult = (props) => {

    return props.searchData.map((book, idx) => {
        const databaseObject = { 
            title: book.volumeInfo.title, 
            author: book.volumeInfo.authors[0], 
            book_id: book.id, 
            have_read: false 
        };
        if (book.volumeInfo.imageLinks) {
            return(
                <div className={styles.searchResult} key={idx}>
                    <button 
                        className={styles.addButton}
                        onClick={() => {props.handleAddToWants(databaseObject)}}
                    >Add</button>
                    <img src={book.volumeInfo.imageLinks.smallThumbnail} alt={`${book.volumeInfo.title} cover`}/>
                    <div className={styles.titleAuthor}>
                        <p>{book.volumeInfo.title}</p>
                        <p> by {book.volumeInfo.authors[0]}</p>
                    </div>
                </div>
            )
        } else {
            return(
                <div className={styles.searchResult} key={idx}>
                    <button className={styles.addButton}>Add</button>
                    <img
                        src={process.env.PUBLIC_URL + 'bookicon2.jpeg'}
                        className={styles.bookIcon}
                        alt='No book cover found'
                    />
                    <div className={styles.titleAuthor}>
                        <p>{book.volumeInfo.title}</p>
                        <p> by {book.volumeInfo.authors[0]}</p>
                    </div>
                </div>
            )
        }
    })
}

export default SearchResult