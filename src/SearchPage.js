import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import Book from './BookObject'
import debounce from 'debounce'

export default class SearchPage extends Component {

    constructor(props){
        super(props);
      	this.search = debounce(this.search.bind(this), 500);
        this.state = {
          bookQuery: '',
          queriedBooks: [],
        }
    }

    updateQuery = (query) => {
      this.setState({bookQuery: query})
      this.search(query);
      
    }

	search(query){
      if(query !== ''){
        BooksAPI.search(query)
           .then(fetchedBooks => {this.setState({queriedBooks: fetchedBooks.error ? [] : fetchedBooks})})
      } else {
        this.setState({queriedBooks: []})
	  }

    }


    render(){
      const {update} = this.props;
        return(
            <div className="search-books">
            	<div className="search-books-bar">
           			<Link className="close-search" to='/'>Close</Link>
          
                    <div className="search-books-input-wrapper">
                        <input 
                        value={this.state.bookQuery}
                        onChange={(event) => this.updateQuery(event.target.value)}
                        type="text"
                        placeholder="Search by title or author"/>
                    </div>

             	</div>

               {this.state.queriedBooks !== []  &&
                      <div className="search-books-results">
                          <ol className="books-grid"> 
                
                              {this.state.queriedBooks.map((bookToObject) => 
                                      <li key={bookToObject.id}>
                                          <Book allBooks={this.props.allBooks} updateBookState={update} book={bookToObject}/>
                                      </li> 
                              )}

                          </ol>
                      </div>
				}
            </div>
        );
    }
}
