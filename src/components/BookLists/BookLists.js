import ReadList from '../ReadAndWantLists/ReadList'
import WantList from '../ReadAndWantLists/WantList'
import styles from './BookLists.module.css'

const BookLists = (props) => {
    return (
        <div className={styles.listContainer}>
            <ReadList getBooks={props.getBooks}/>
            <WantList getBooks={props.getBooks}/>
        </div>
    )
}

export default BookLists