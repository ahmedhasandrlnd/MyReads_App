import React from "react";
import {Link, Route} from "react-router-dom";

import * as BooksAPI from "./BooksAPI";
import BookShelf from "./BookShelf";
import BookSearch from "./BookSearch";
import "../App.css";


class BooksApp extends React.Component {

    constructor() {
        super()
        this.state = {
            allBooks: [],
            searchBooksList: [],
            isLoading: true,
            shelfTypes:[]
        };
    }

   


    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({allBooks: books, isLoading: false, 
                shelfTypes:[
                    { type: 'currentlyReading', title: 'Currently Reading' },
                    { type: 'wantToRead', title: 'Want to Read' },
                    { type: 'read', title: 'Read' }
                ] });
        });
    }

    changeBookCategory = (book, newBookCategory) => {
        BooksAPI.update(book, newBookCategory).then(() => {
            book.shelf = newBookCategory;
            this.setState(state => ({
                allBooks: state.allBooks.filter(currentBook => currentBook.id !== book.id).concat([book])
            }));
        });
    };



    getBookContent() {
        if (this.state.isLoading) {
            return ( (<div className="loader"></div>))
        } else {
            return ( <Route exact path="/" render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">

                           {this.state.shelfTypes.map((shelf, index) => {
                                const shelfBooks = this.state.allBooks.filter((book) => book.shelf === shelf.type);
                                console.log(shelf.type,shelfBooks)
                                return (
                                <div className="bookshelf" key={index}>
                                    <BookShelf
                                        title={shelf.title}
                                        changeBookCategory={this.changeBookCategory}
                                        books={shelfBooks}/>
                                </div>
                                );
                            })}
                        </div>
                        <div className="open-search">
                            <Link to="/search">Add a book</Link>
                        </div>
                    </div>
                )}/>
            )
        }

    }

    render() {
        return (
            <div className="app">
                {this.getBookContent()}
                <Route path="/search" render={({history}) => (
                    <BookSearch
                        books={this.state.allBooks}
                        changeBookCategory={this.changeBookCategory}
                    />
                )}/>
            </div>
        )
    }
}

export default BooksApp
