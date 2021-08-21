import React from 'react'
// import * as BooksAPI from './BooksAPI'
import AllShelves from './components/AllShelves'
import './App.css'
import SearchBar from './components/SearchBar'
import Button from './components/Button'
import Header from './components/Header'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  upDateSearchBarState = (state) => {
    this.setState({
      showSearchPage : !state
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBar searchPage={this.upDateSearchBarState}/>
        ) : (
          <div className="list-books">
            <Header />
            <AllShelves/>            
           <Button  searchPage={this.upDateSearchBarState}/>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
