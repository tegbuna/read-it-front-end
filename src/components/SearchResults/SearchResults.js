import styles from './SearchResults.module.css'
import SearchResult from '../SearchResult/SearchResult'

const SearchResults = (props) => {
    if (props.searchData.length > 0) {
        return(
            <div className={styles.deskBackground}>
                <div className={styles.notebookBackground}>
                    <div className={styles.searchResultsContainer}>
                        <SearchResult 
                            searchData={props.searchData} 
                            addBookToList={props.addBookToList}
                        />
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <p></p>
        )
    }
}

export default SearchResults