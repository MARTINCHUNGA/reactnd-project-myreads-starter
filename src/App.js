import React from 'react'
 //import * as BooksAPI from './BooksAPI'
import AllShelves from './components/AllShelves'
import './App.css'
import SearchBar from './components/SearchBar'
import Button from './components/Button'
//import Header from './components/Header'
import * as BooksAPI from './BooksAPI'
import {Switch, Route, withRouter} from 'react-router-dom'
//import Shelf from './components/Shelf'


class BooksApp extends React.Component {
  // constructor(props) {
  //   super(props);
    
  // }
  state = {

    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    
    books: [],
    showSearchPage: false,
   
    
  }

  //Get all the books here using getAll function defined in BooksAPI
  componentDidMount(){
   BooksAPI.getAll().then((response) => {
     this.setState({
       books: response
     })
    })
  }

moveBookToShelf = (changedBook,shelf) => {
  BooksAPI.update(changedBook,shelf).then(response =>{
    changedBook.shelf = shelf
    console.log("response",response)

    this.setState(prevState => ({
      books: prevState.books
      .filter(book => book.id !== changedBook.id)
      .concat(changedBook)
    }))
  })
}

  upDateSearchBarState = () => {
    this.props.history.push("/search")
  }

  
  render() {   
    return (
      <div className="app">

        <Switch>
          <Route path="/search" component={()=>
            <SearchBar 
            
            moveBookToShelf={this.moveBookToShelf}
            books={this.state.books}
            />
          }/>

          <Route path="/" component={()=>
          <AllShelves  
          books={this.state.books}
          moveBookToShelf={this.moveBookToShelf}
          />  }/>
          
       
          {/* // <SearchBar 
          // searchPage={this.upDateSearchBarState}
          // moveBookToShelf={this.moveBookToShelf}
          // books={this.state.books}
          // />
        
          <div className="list-books">
            <Header />

            {/* pass the books to the shelves as props from state*/}
            {/* <AllShelves  
            books={this.state.books}
            moveBookToShelf={this.moveBookToShelf}
            />            
           <Button  searchPage={this.upDateSearchBarState}/>
          </div>
        
        <
        */} 

        </Switch>
        <Button  searchPage={this.upDateSearchBarState}/>
      </div> 
    )
  }
}

export default withRouter(BooksApp)
