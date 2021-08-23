import React from 'react'
 //import * as BooksAPI from './BooksAPI'
import AllShelves from './components/AllShelves'
import './App.css'
import SearchBar from './components/SearchBar'
import Button from './components/Button'
import Header from './components/Header'
import { getAll } from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    query:"",
    books: [],
    showSearchPage: false
  }

  upDateSearchBarState = (state) => {
    this.setState({
      showSearchPage : !state
    })
  }

  //Get all the books here using getAll function defined in BooksAPI
  componentDidMount(){
   getAll().then((response) => (
     this.setState({
       books: response
     })
   ))
  }

  
  moveBookToShelf = (book,shelf) => {
    this.setState({
      books: this.state.books.map(myBook => {
        return myBook.id === book.id?(myBook.shelf = shelf):myBook
      })
    })
  }

  updateQuery = (query) =>{
    this.setState(() => ({
      query : query.trim()
    }))

  }

  render() {
   
    //console.log(this.state.books)

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBar 
          searchPage={this.upDateSearchBarState}
          updateQuery={this.updateQuery}
          />
        ) : (
          <div className="list-books">
            <Header />

            {/* pass the books to the shelves as props from state*/}
            <AllShelves  
            books={this.state.books}
            moveBookToShelf={this.moveBookToShelf}
            />            
           <Button  searchPage={this.upDateSearchBarState}/>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
