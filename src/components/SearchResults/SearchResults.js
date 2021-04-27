import styles from './SearchResults.module.css'
import SearchResult from '../SearchResult/SearchResult'

const SearchResults = (props) => {
    if (props.searchData !== '') {
        return(
            <div className={styles.searchResultsContainer}>
                <SearchResult searchData={props.searchData} />
            </div>
        )
        // return props.searchData.map((book, idx) => {
        //     return(
        //         <div className={styles.searchResult}>
        //             <img src={book.volumeInfo.imageLinks.smallThumbnail}/>
        //             <div className={styles.titleAuthor}>
        //                 <p>{book.volumeInfo.title}</p>
        //                 <p> by {book.volumeInfo.authors[0]}</p>
        //             </div>
        //         </div>
        //     )
        // })
    } else {
        return (
            <p></p>
        )
    }
}

export default SearchResults