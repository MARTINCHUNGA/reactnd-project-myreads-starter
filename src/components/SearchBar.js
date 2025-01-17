
import React,{Component} from 'react'
import * as BooksAPI from '../BooksAPI'

import {withRouter,Link} from 'react-router-dom'

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

  clearSearchInput = () =>{
    this.setState({
      query : "",
      searchedBooks: []
    })
  }

retriveBooks = (query) =>{
  this.setState((prevState) => ({...prevState,query}))
  BooksAPI.search(query).then((response) =>{
    if(typeof response !== "undefined" && response.error !== "empty query"){
      this.setState(()=> ({
        searchedBooks: response
      }))
    }else{
      this.setState(() => ({
        searchedBooks : []
      }))
    }
  })
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


    render(){

      //console.log(this.props.moveBookToShelf)
      const noThumbNail = 'https://www.ppxray.com/wp-content/themes/ppxray.com/images/thumbnail.png'
      const searchedBooks = this.state.searchedBooks
      const shelfBooks = this.state.shelfBooks
      const updatedBooks = searchedBooks.map(book => {
        shelfBooks.map(shelfBook =>{
          if(shelfBook.id === book.id){
            book.shelf = shelfBook.shelf
          }
          return shelfBook 
        })
        return book
      })

      console.log(updatedBooks)
    
        return(

            <div className="search-books">
            <div className="search-books-bar">
              <Link to="/">
              <button   className="close-search" onClick={this.clearSearchInput}>Close</button>
              </Link>
              
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
                onChange={(event) => this.retriveBooks(event.target.value)}
                 //onChange={(event) => this.updateQuery(event)}
                />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {updatedBooks.map(book => {
                    return <li key={book.id}> 
                     <div className="book">
                    <div className="book-top">
                       <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks?book.imageLinks.smallThumbnail : noThumbNail})` }}></div>
                          <div className="book-shelf-changer">
                             <select 
                            //onClick={this.props.moveBookToShelf}
                            //moveBookToShelf={this.props.moveBookToShelf}

                             value={book.shelf ? book.shelf : "none"}
                             onChange={e => this.props.moveBookToShelf(book, e.target.value)}
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