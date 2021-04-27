import './App.css';
import { useEffect, useState } from 'react';
import { searchByTitle } from './services/book_api'
import { searchByAuthor } from './services/book_api'
import SearchResults from './components/SearchResults/SearchResults'

function App() {

  const [ searchData, setSearchData ] = useState({})
  const [ searchInput, setSearchInput ] = useState('')

  async function bookSearch() {
    if (searchInput !== '') {
      const newSearchResults = await searchByTitle(searchInput)
      setSearchData(newSearchResults)
      console.log(newSearchResults)
    }
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    bookSearch()
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

      <SearchResults searchData={searchData}/>
     
    </div>
  );
}

export default App;
