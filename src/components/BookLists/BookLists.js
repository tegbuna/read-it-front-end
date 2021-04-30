import ReadList from '../ReadAndWantLists/ReadList'
import WantList from '../ReadAndWantLists/WantList'
import styles from './BookLists.module.css'

const BookLists = (props) => {

    const changeRead = (bookId) => {
        console.log(props.getBooks);
    }
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
                        changeRead={changeRead}
                        />
                    </div>
                    <div className={styles.wantList}>
                        <WantList 
                        getBooks={props.getBooks}
                        handleUpdate={props.handleUpdate}
                        handleDelete={props.handleDelete}
                        changeRead={changeRead}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookLists