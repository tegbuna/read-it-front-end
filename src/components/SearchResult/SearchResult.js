import styles from './SearchResult.module.css'

const SearchResult = (props) => {
    return props.searchData.map((book, idx) => {
        return(
            <div className={styles.searchResult}>
                <img src={book.volumeInfo.imageLinks.smallThumbnail}/>
                <div className={styles.titleAuthor}>
                    <p>{book.volumeInfo.title}</p>
                    <p> by {book.volumeInfo.authors[0]}</p>
                </div>
            </div>
        )
    })
}

export default SearchResult