import styles from './Lists.module.css'

const WantList = (props) => {
    if (props.getBooks.books.length > 0) {
        return props.getBooks.books.map((book, idx) => {
            if (book.have_read == false) {
                return(
                    <div className={styles.listItem}>
                        <p>{book.title}</p>
                        <p> by {book.author}</p>
                        <button className={styles.deleteBtn} onClick={() => props.handleDelete(book.id)}>X</button>
                    </div>
                )
            }
        })
    } else {
        return(<p></p>)
    }
}

export default WantList