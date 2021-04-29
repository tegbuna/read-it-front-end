import styles from './Lists.module.css'

const ReadList = (props) => {
    if (props.getBooks.books.length > 0) {
        return props.getBooks.books.map((book, idx) => {
            if (book.have_read === true) {
                return(
                    <div className={styles.listItem}>
                        <p>{book.title}</p>
                        <p> by {book.author}</p>
                    </div>
                )
            }
        })
    } else {
        return <p>yeehee!</p>
    }
}

export default ReadList