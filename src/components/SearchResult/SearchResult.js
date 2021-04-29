import styles from './SearchResult.module.css'
import { useState } from 'react'

const SearchResult = (props) => {

    const [ wantDisabled, setWantDisabled ] = useState([false, false, false, false, false, false, false, false, false, false])
    const [ readDisabled, setReadDisabled ] = useState([false, false, false, false, false, false, false, false, false, false])

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
                            disabled={wantDisabled[idx]}
                            onClick={() => {
                                props.addBookToList(databaseObject)

                                let wantDisArr = wantDisabled
                                wantDisArr.splice(idx, 1, true)
                                setWantDisabled(wantDisArr)

                                let readDisArr = readDisabled
                                readDisArr.splice(idx, 1, false)
                                setReadDisabled(readDisArr)
                            }}
                        >Add to reading list</button>
                        <button 
                            disabled={readDisabled[idx]}
                            onClick={() => {
                                props.addBookToList(alreadyReadObject)

                                let readDisArr = readDisabled
                                readDisArr.splice(idx, 1, true)
                                setReadDisabled(readDisArr)

                                let wantDisArr = wantDisabled
                                wantDisArr.splice(idx, 1, false)
                                setWantDisabled(wantDisArr)
                            }}
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
                            disabled={wantDisabled[idx]}
                            onClick={() => {
                                props.addBookToList(databaseObject)

                                let wantDisArr = wantDisabled
                                wantDisArr.splice(idx, 1, true)
                                setWantDisabled(wantDisArr)

                                let readDisArr = readDisabled
                                readDisArr.splice(idx, 1, false)
                                setReadDisabled(readDisArr)
                            }}
                        >Add to reading list</button>
                        <button 
                            disabled={readDisabled[idx]}
                            onClick={() => {
                                props.addBookToList(alreadyReadObject)

                                let readDisArr = readDisabled
                                readDisArr.splice(idx, 1, true)
                                setReadDisabled(readDisArr)

                                let wantDisArr = wantDisabled
                                wantDisArr.splice(idx, 1, false)
                                setWantDisabled(wantDisArr)
                            }}
                        >Done reading!</button>
                    </div>
                </div>
            )
        }
    })
}

export default SearchResult