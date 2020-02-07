import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './BookShelf'
import SearchPage from './SearchPage'
import {Link, Route} from 'react-router-dom';

export default class BooksApp extends React.Component {
  state = {
    allBooks: [],
    shelves: [{shelfID:'currentlyReading', title: 'Currently Reading'},
     {shelfID: 'wantToRead', title: 'Want to Read'},{shelfID:'read', title: 'Read'}]
  }

  componentDidMount(){
    BooksAPI.getAll().then((allBooks) => {
      this.setState(() => ({allBooks}))
    })
  }

  updateShelf = (book, shelf) => {
    //We filter all the books different than the one we are updating,
    //then we concat the filtered array to the updated book
    BooksAPI.update(book, shelf).then(  
    this.setState((prevState) => ({allBooks: prevState.allBooks
                                   .filter(books => books.id !== book.id)
                                   .concat([{...book, shelf}])}))
    );
  }


  render() {
    return (
      <div className="app">
           <Route exact path='/' render={() => (
    
                <div className="list-books">
   
                  <div className="list-books-title">
                    <h1>MyReads</h1>
                  </div>
    
                   {this.state.allBooks !== [] &&
                    	this.state.shelves.map( (shelf) => 
                          <Shelf
                          key={shelf.shelfID} 
                          update={this.updateShelf}
                          booksArray={this.state.allBooks}
                          shelfID={shelf.shelfID}
                          shelfTitle={shelf.title}/>
						)
					}

                  <div className="open-search">
                    <Link to="/search">Search</Link> 
                  </div>

                </div>
          )}/>

          <Route exact path="/search" render={() => (
                <SearchPage allBooks={this.state.allBooks} update={this.updateShelf}/> 
          )}/>

      </div>
    )
  }
}
