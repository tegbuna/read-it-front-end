import styles from './SearchResults.module.css'
import SearchResult from '../SearchResult/SearchResult'

const SearchResults = (props) => {
    if (props.searchData.length > 0) {
        return(
            <div className={styles.searchResultsContainer}>
                <SearchResult 
                    searchData={props.searchData} 
                    handleAddToWants={props.handleAddToWants}
                    handleAddToReads={props.handleAddToReads}
                />
            </div>
        )
    } else {
        return (
            <p></p>
        )
    }
}

export default SearchResults