import React, {Component} from 'react';

/*
  This class will receive the Book Object and generate its unique UI
*/

export default class BookObject extends Component{
  
  	constructor(props){
    	super(props)
      	this.handleImage = this.handleImage.bind(this);
    }
  
    bookStateHandler = (e) => {this.props.updateBookState(this.props.book, e.target.value)};
    
    formatAuthorName = () => {
      if (this.props.book.authors !== null && this.props.book.authors !== undefined ) {
          var sentence = [];
          const authors = this.props.book.authors.map(authors => authors);
          for(const author of authors){
            sentence.push(author);
          }
          return sentence.join(', ');
      } else {
          const noAuthor = 'No author';
          return noAuthor; 
      }
      
    }

	handleShelf(queriedBook){
    	//Let's check if the book has a shelf
      	if(queriedBook.shelf){
          return queriedBook.shelf
        }else{
      	//Since the search method doesn't fetch a books' shelves, we need to compare the books to our shelves
    		const checkBook = this.props.allBooks.filter((book) => book.id === queriedBook.id);
			if(checkBook.length === 0){
            	return "none";
            }else{
            //The filter method used to generate checkBook returns an array, that's why we must access its first element  
            	return checkBook[0].shelf;
            }
    	}
    	
    
    }

	handleImage(queriedBook){
      //The book object must have an imageLinks array which must contain a thumbnail as well
		if(queriedBook.imageLinks && queriedBook.imageLinks.thumbnail){
        	return `url(${queriedBook.imageLinks.thumbnail})`
        } else {
    		return 'No image resource'
    	}
    }

    render(){
      const {book} = this.props;
        return(
            <div className="book">
                 <div className="book-top">
                    <div className="book-cover" 
          				style={{ width: 128, height: 193, backgroundImage: `${this.handleImage(book)}` }}>
                        </div>

                            <div className="book-shelf-changer">
                              <select onChange={this.bookStateHandler} 	defaultValue={this.handleShelf(book)}>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                            </div>

                         </div>

                     <div className="book-title">{book.title}</div>
                  <div className="book-authors">{this.formatAuthorName()}</div>
            </div>
        );
    }
}
