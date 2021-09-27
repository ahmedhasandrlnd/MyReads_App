import React, {Component} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import * as BooksAPI from './BooksAPI'
import Book from "./Book";

class BookSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchBooksList: []
        }

    }

    MAX_RESULTS_PER_PAGE = 20;

    componentWillUnmount() {
        this.searchBooks("");
    }

    searchBooks = (searchQuery) => {
        if (searchQuery) {
            BooksAPI.search(searchQuery, this.MAX_RESULTS_PER_PAGE).then((searchableBooks) => {
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
                        searchBooksList: searchableBooks
                    });
                }
            });
        } else {
            this.setState({
                searchBooksList: []
            });

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