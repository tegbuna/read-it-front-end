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

  const handleAddToWants = async (databaseObject) => {
    try {
      const book = await fetch('http://localhost:3000/want_to_reads', {
        body: JSON.stringify(databaseObject),
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());
      setBooks(prevState => ({
        notReadBooks: [book, ...prevState.notReadBooks]
      }));
    } catch (error) {
      console.log(error);
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
      setBooks(getBooks.push(book));
    } catch (error) {
      console.log(error);
    };
  };

  // const handleUpdate = async (databaseObject) => {
  //   try {
  //     console.log(databaseObject);
  //     await fetch(`http://localhost:3000/already_reads/${databaseObject.id}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'Application/json'
  //       },
  //       body: JSON.stringify(databaseObject)
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   };

  //   const bookIdx = getBooks.readBooks.findIndex(book => book.id === databaseObject.id);
  //   const updatedBookArray = getBooks.readBooks;
  //   updatedBookArray.splice(bookIdx, 1, databaseObject);
  //   setBooks({ readBooks: updatedBookArray });
  // };

  const handleUpdateUnread = async (databaseObject) => {
    try {
      console.log(databaseObject);
      await fetch(`http://localhost:3000/want_to_reads/${databaseObject.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'Application/json'
        },
        body: JSON.stringify(databaseObject)
      });
    } catch (error) {
      console.log(error);
    };

    const bookIdx = getBooks.notReadBooks.findIndex(book => book.id === databaseObject.id);
    const updatedBookArray = getBooks.notReadBooks;
    updatedBookArray.splice(bookIdx, 1, databaseObject);
    setBooks({ notReadBooks: updatedBookArray });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    bookSearch();
    history.push('/search');
  };

  return (
    <div className="App">
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
          />
        } />
      </Switch>
      {/* <button onClick={() => {
        handleUpdate({
          title: 'Harry Potter',
          author: 'J. K. Rowling', 
          book_id: "3YUrtAEACAAJ",
          have_read: true
        })
      }}>handleUpdate</button> */}
    </div>
  );
}

export default App;
