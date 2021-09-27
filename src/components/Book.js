import React, {Component} from "react";
import PropTypes from "prop-types";


class Book extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentBookCategory: this.props.book.shelf,
            updatingBookCategory: false
        };
    }

    changeBookCategory = (event) => {
        this.props.changeBookCategory(this.props.book, event.target.value);
        this.setState({
            currentBookCategory: event.target.value,
            updatingBookCategory: true
        });
    };

    componentWillReceiveProps() {
        this.setState({
            updatingBookCategory: false
        });
    }

    getBookCategoryChangeOption() {
        return (
            <div className="book-shelf-changer">
                <select
                    value={this.state.currentBookCategory}
                    onChange={this.changeBookCategory}
                >
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
                { this.state.updatingBookCategory && (<div className="cssload-spin-box"></div>)}
            </div>
        )
    }

    render() {
        return (
            <div className="book">
                <div className="book-top"/>
                <div className="book-cover" style={{
                    width: 128,
                    height: 193,
                    backgroundImage: `url("${this.props.book.imageLinks.thumbnail}")`
                }}></div>

                {this.getBookCategoryChangeOption()}
                <div className="book-title">{this.props.book.name}</div>
                <div className="book-authors">{this.props.book.authors}</div>
            </div>
        )
    }
}
Book.propTypes = {
    book: PropTypes.object.isRequired,
    changeBookCategory: PropTypes.func.isRequired
}

export default Book;