import styles from './Lists.module.css'

const WantList = (props) => {
    if (props.getBooks.length > 0) {
        return props.getBooks.books.map((book, idx) => {
            if (book.have_read === false) {
                <div>
                    <p>{book.title}</p>
                    <p> by {book.author}</p>
                </div>
            }
        })
    } else {
        return <p>woohoo!</p>
    }
}

export default WantList