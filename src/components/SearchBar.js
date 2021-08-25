
import React,{Component} from 'react'
import * as BooksAPI from '../BooksAPI'

import {withRouter} from 'react-router-dom'

class SearchBar extends Component{

  state= {
    shelfBooks:[],
    query:"",
    searchedBooks:[],
    sholeBooks:[]
  }

  componentDidMount(){
    BooksAPI.getAll().then((response) => {
      this.setState({
        shelfBooks: response
      })
     })
   }


  updateQuery = (event) =>{
    this.setState({
      query : event.target.value
    })  
  }


componentDidUpdate(){
  if(this.state.query){
    BooksAPI.search(this.state.query).then(res=>{
      this.setState({
          searchedBooks:res
      })
    })
  }

  if(!this.state.searchedBooks.error){
    this.state.searchedBooks.forEach(book=>{
      this.state.shelfBooks.filter(ourBook=>{
        if(ourBook.id===book.id){
          book.shelf = ourBook.shelf
          this.setState({
            searchedBooks: [...this.state.searchedBooks, book]
          })
          
        }
      })
    })
 
  }
}

handleBookShelfChange = (book,shelf) => {
  const desiredBooks = this.state.searchedBooks.map(myBook =>{
    if(myBook.id === book.id) {
      myBook.shelf = shelf;

    }
    return myBook;
  })
  this.setState({
    searchedBooks : desiredBooks
  })
}
returnHome = ()=>{
this.props.history.push("/")
}

    render(){
   
      const booksToDisplay = this.state.searchedBooks
      let currentShelf = "none"
    
        return(

            <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={this.returnHome}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input 
                type="text" 
                placeholder="Search by title or author"
                value={this.state.query}
                onChange={(event) => this.updateQuery(event)}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {booksToDisplay.map(book => {
                    return <li key={book.id}> 
                     <div className="book">
                    <div className="book-top">
                       <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                          <div className="book-shelf-changer">
                             <select 
                             defaultValue={currentShelf}
                             //value={book.shelf}
                             onChange={e => this.handleBookShelfChange(book, e.target.value)}
                             >
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                          </div>
                        </div>
                      <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                  </div>
                  </li>
                })}  
              </ol>
            </div>
          </div>

        )
    }
}

export default withRouter(SearchBar)