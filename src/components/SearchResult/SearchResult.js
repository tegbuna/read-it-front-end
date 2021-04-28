import styles from './SearchResult.module.css'

const SearchResult = (props) => {
    return props.searchData.map((book, idx) => {
        if (book.volumeInfo.imageLinks) {
            return(
                <div className={styles.searchResult} key={idx}>
                    <button className={styles.addButton}>Add</button>
                    <img src={book.volumeInfo.imageLinks.smallThumbnail}/>
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