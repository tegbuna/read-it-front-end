import styles from './SearchResult.module.css'
import { useRef } from 'react'

const SearchResult = (props) => {

    // let btnRef = useRef()

    // const onBtnClick = e => {
    //     if (btnRef.current) {
    //         btnRef.current.setAttribute("disabled", "disabled")
    //     }
    // }

    return props.searchData.map((book, idx) => {
        const databaseObject = { 
            title: book.volumeInfo.title, 
            author: book.volumeInfo.authors[0], 
            book_id: book.id, 
            have_read: false 
        };
        const alreadyReadObject = { 
            title: book.volumeInfo.title, 
            author: book.volumeInfo.authors[0],
            book_id: book.id, 
            have_read: true 
        };
        if (book.volumeInfo.imageLinks) {
            return(
                <div className={styles.searchResult} key={idx}>
                    <img src={book.volumeInfo.imageLinks.smallThumbnail} alt={`${book.volumeInfo.title} cover`}/>
                    <div className={styles.titleAuthor}>
                        <p>{book.volumeInfo.title}</p>
                        <p> by {book.volumeInfo.authors[0]}</p>
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
                        <p> by {book.volumeInfo.authors[0]}</p>
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