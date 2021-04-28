import './App.css';
import { useEffect, useState } from 'react';
import { Route, Switch, Link, useHistory } from 'react-router-dom';
import { searchByTitle } from './services/book_api'
import { searchByAuthor } from './services/book_api'
import SearchResults from './components/SearchResults/SearchResults'

function App() {

  const [ searchData, setSearchData ] = useState([]);
  const [ searchInput, setSearchInput ] = useState('');
  const [ getBooks, setBooks ] = useState({
    readBooks: [],
    notReadBooks: []
  });

  useEffect(() => {
    const getBooks = async () => {
      const readBooks = await fetch('http://localhost:3000/already_reads')
        .then(res => res.json());
      const notReadBooks = await fetch('http://localhost:3000/want_to_reads')
        .then(res => res.json());
        setBooks({ readBooks, notReadBooks });
    }

    getBooks();
  }, [])

  let history = useHistory()

  async function bookSearch() {
    if (searchInput !== '') {
      const newSearchResults = await searchByTitle(searchInput)
      setSearchData(newSearchResults.items)
      console.log(newSearchResults.items)
    }
  }

  const handleAddToWants = async (event, formInputs) => {
    try {
      event.preventDefault();
      const book = await fetch('http://localhost:3000/want_to_reads', {
        body: JSON.stringify(formInputs),
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());
      setBooks(prevState => ({
        notReadBooks: [book, ...prevState.notReadBooks]
      }))
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddToReads = async (event, formInputs) => {
    try {
      event.preventDefault();
      const book = await fetch('http://localhost:3000/already_reads', {
        body: JSON.stringify(formInputs),
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());
      setBooks(prevState => ({
        readBooks: [book, ...prevState.readBooks]
      }))
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    bookSearch()
    history.push('/search')
  }

  return (
    <div className="App">
      <header className="App-header">
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
            <SearchResults searchData={searchData}/>
        } />
      </Switch>
    </div>
  );
}

export default App;
