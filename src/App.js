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
  const [ getBooks, setBooks ] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const books = await fetch('http://localhost:3000/books')
        .then(res => res.json());
        setBooks({ books });
    };

    getBooks();
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
      const book = await fetch('http://localhost:3000/books', {
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
    } catch (error) {
      console.log(error);
    };
  };

  const handleUpdate = async (formInputs) => {
    try {
      console.log(formInputs);
      await fetch(`http://localhost:3000/already_reads/${formInputs.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'Application/json'
        },
        body: JSON.stringify(formInputs)
      });
    } catch (error) {
      console.log(error);
    };

    const bookIdx = getBooks.readBooks.findIndex(book => book.id === formInputs.id);
    const updatedBookArray = getBooks.readBooks;
    updatedBookArray.splice(bookIdx, 1, formInputs);
    setBooks({ readBooks: updatedBookArray });
  };

  const handleDelete = async (bookId) => {
    try {
      await fetch(`http://localhost:3000/books/${bookId}`, {
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
              className="search-field"
              type="text"
              onChange={e => setSearchInput(e.target.value)}
            />
          </label>
          <input className="search-button" type="submit" value="Search" />
        </form>
      </header>
      {/* Routed components */}
      <Switch>
        <Route exact path = '/search' render={(props) =>
          <SearchResults 
            searchData={searchData}
            addBookToList={addBookToList}
          />
        } />
        <Route exact path='/' render={(props) => 
          <BookLists  
            getBooks={getBooks}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        } />
      </Switch>
    </div>
  );
}

export default App;
