import ReadList from '../ReadAndWantLists/ReadList'
import WantList from '../ReadAndWantLists/WantList'
import styles from './BookLists.module.css'

const BookLists = (props) => {
    return (
        <div className={styles.containerContainer}>
            <div className={styles.listsContainer}>
                <div className={styles.readList}>
                    <ReadList 
                      getBooks={props.getBooks}
                      handleUpdate={props.handleUpdate}
                      handleDelete={props.handleDelete}
                    />
                </div>
                <div className={styles.wantList}>
                    <WantList 
                      getBooks={props.getBooks}
                      handleUpdate={props.handleUpdate}
                      handleDelete={props.handleDelete}
                    />
                </div>
            </div>
        </div>
    )
}

export default BookLists