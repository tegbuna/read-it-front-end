import './App.css';
import { useEffect, useState } from 'react';
import { Route, Switch, Link, useHistory } from 'react-router-dom';
import { searchByTitle } from './services/book_api';
// import { searchByAuthor } from './services/book_api';
import SearchResults from './components/SearchResults/SearchResults';
import BookLists from './components/BookLists/BookLists';

function App() {

  const [ searchData, setSearchData ] = useState([]);
  const [ searchInput, setSearchInput ] = useState('');
  const [ getBooks, setBooks ] = useState({books: []});
  const [ wantDisabled, setWantDisabled ] = useState([false, false, false, false, false, false, false, false, false, false])
  const [ readDisabled, setReadDisabled ] = useState([false, false, false, false, false, false, false, false, false, false])

  useEffect(() => {
    const acquireBooks = async () => {
      const books = await fetch('https://read-it-back.herokuapp.com/books')
        .then(res => res.json());
        setBooks({ books });
    };

    acquireBooks();
  }, []);

  let history = useHistory();

  async function bookSearch() {
    if (searchInput !== '') {
      const newSearchResults = await searchByTitle(searchInput);
      setSearchData(newSearchResults.items);
    };
  };

  const addBookToList = async (bookObject) => {
    try {
      if (getBooks.books.find(book => book.book_id === bookObject.book_id)) {
        alert(`You've already added this book!`);
      } else {
        const book = await fetch('https://read-it-back.herokuapp.com/books', {
          body: JSON.stringify(bookObject),
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          }
        }).then(res => res.json());
        setBooks(prevState => ({
          books: [book, ...prevState.books]
        }));
      }
    } catch (error) {
      console.log(error);
    };
  };

  const handleUpdate = async (formInputs) => {
    try {
      await fetch(`https://read-it-back.herokuapp.com/books/${formInputs.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'Application/json'
        },
        body: JSON.stringify(formInputs)
      });
    } catch (error) {
      console.log(error);
    };

    const bookIdx = getBooks.books.findIndex(book => book.id === formInputs.id);
    const updatedBookArray = getBooks.books;
    updatedBookArray.splice(bookIdx, 1, formInputs);
    setBooks({ books: updatedBookArray });
  };

  const handleDelete = async (bookId) => {
    try {
      await fetch(`https://read-it-back.herokuapp.com/books/${bookId}`, {
        method: 'DELETE'
      });
      const updatedBooks = getBooks.books.filter(book => book.id !== bookId);
      setBooks({
        books: updatedBooks
      });
    } catch (error) {
      console.log(error);
    };
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    bookSearch();
    history.push('/search');
    setReadDisabled([false, false, false, false, false, false, false, false, false, false]);
    setWantDisabled([false, false, false, false, false, false, false, false, false, false]);
  };

  return (
    <div className="App">
      {/* HEADER */}
      <header className="App-header">
        <img src={process.env.PUBLIC_URL + 'readit-favicon.png'} alt='readit favicon' className='app-favicon'/>
        <Link to='/' className='root-link'>Home</Link>
        <form onSubmit={handleSubmit} className="header-search">
          <label className="search-by-title">
            Search By Title:
            <input
              className="search-field form-control"
              type="text"
              onChange={e => setSearchInput(e.target.value)}
            />
          </label>
          <input className="search-button btn btn-light" type="submit" value="Search" />
        </form>
      </header>
      {/* Routed components */}
      <Switch>
        <Route exact path = '/search' render={(props) =>
          <SearchResults 
            searchData={searchData}
            addBookToList={addBookToList}
            wantDisabled={wantDisabled}
            readDisabled={readDisabled}
            setWantDisabled={setWantDisabled}
            setReadDisabled={setReadDisabled}
          />
        } />
        <Route exact path='/' render={(props) => 
          <BookLists  
            getBooks={getBooks}
            setBooks={setBooks}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        } />
      </Switch>
    </div>
  );
}

export default App;
