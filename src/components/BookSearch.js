import React, {Component} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import * as BooksAPI from './BooksAPI'
import Book from "./Book";


class BookSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchBooksList: [],
            searchError: false
        }

    }

    
 
    componentWillUnmount() {
        this.searchBooks("");
    }

    searchBooks = (searchQuery) => {
        const terms=['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'History', 'History', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Program Javascript', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'];
        
        
        if (!searchQuery||(searchQuery==='')||!(terms.includes(searchQuery))) 
        {
            this.setState({
                searchBooksList: []
            });

        }        
        else 
        {
            BooksAPI.search(searchQuery.trim()).then((searchableBooks) => {
                if (searchableBooks.length) {
                    searchableBooks.forEach((book, index) => {
                        let bookToBeMatched = this.props.books.find((currentBook) => currentBook.id === book.id);
                        if (bookToBeMatched) {
                            book.shelf = bookToBeMatched.shelf
                        } else {
                            book.shelf = 'none'
                        }
                        searchableBooks[index] = book;
                    });
                    this.setState({
                        searchBooksList: searchableBooks,
                        searchError: false
                    })
                }
            })
            .catch(error => {
                this.setState({
                  searchBooksList: [],
                  searchError: true
                })
                console.log(this.state.searchError)
              })

        } 

    };

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/"> Close Search</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={(event) => this.searchBooks(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                    {this.state.searchError === true && (
                        <div className="search-error">
                        Your search did not match any books
                        </div>
                      )}
                        {this.state.searchBooksList.map((book) => (
                            <li key={book.id} className="contact-list-item">
                                <Book
                                    book={book}
                                    changeBookCategory={this.props.changeBookCategory}/>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}
BookSearch.propTypes = {
    books: PropTypes.array.isRequired,
    changeBookCategory: PropTypes.func.isRequired
}

export default BookSearch;