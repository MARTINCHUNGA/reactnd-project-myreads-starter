

import React,{Component} from 'react'
// import CurrentlyReading from './CurrentlyReadin'
// import WantToRead from './WantToRead'
// import Read from './Read'
import Shelf from './Shelf'

class AllShelves extends Component{
    render(){

      const booksInfor = this.props.books 
      //console.log("AllShelf we here",booksInfor)

      // filter books according to the shelf they belong
      const currentReading = booksInfor.filter(myShelf =>myShelf.shelf === "currentlyReading")
      const wantToRead = booksInfor.filter(wantShelf =>wantShelf.shelf === "wantToRead")
      const read = booksInfor.filter(readShelf =>readShelf.shelf === "read")

     

        return(
            <div className="list-books-content">
              {/* pass the books in each shelf to individual component */}
                <Shelf 
                myBooksInfor={currentReading}
                title={"Currently Reading"}
                moveBookToShelf={this.props.moveBookToShelf}
                // switchBookToShelf={this.props.switchBookToShelf}
                />
                <Shelf 
                myBooksInfor={wantToRead}
                title={"Want To Read"}
                moveBookToShelf={this.props.moveBookToShelf}
                // switchBookToShelf={this.props.switchBookToShelf}
                />
                <Shelf
                myBooksInfor={read}
                title={"Read"}
                moveBookToShelf={this.props.moveBookToShelf}
                // switchBookToShelf={this.props.switchBookToShelf}
                />
              </div>

               
        )
    }
}

export default AllShelves