import React, {Component} from 'react';
import Book from './BookObject'

/*
The BookShelf shall receive a list of Books, it shall then create book objects
for each book it has received.
*/

export default class BookShelf extends Component{
	

    render(){
        const {booksArray, update} = this.props;
        const filteredBooks = booksArray.filter((bookToObject) => bookToObject.shelf === this.props.shelfID);
        return(
            <div>
                {filteredBooks !== [] && 
                <div className="bookshelf">
                  <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      
                        {filteredBooks.map((bookToObject) =>
                            <li key={bookToObject.id}><Book  updateBookState={update}  book={bookToObject}/></li>
                        )}
  
                    </ol>
                  </div>
                </div>
                }
            </div>
        );
    }
}
  