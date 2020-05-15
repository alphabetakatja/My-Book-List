// Book Class: Represents a Book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class: Handles UI Tasks
class UI {
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(book => UI.addBookToList(book));  
    }

    static addBookToList(book) {
        const list = document.getElementById('book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn bth-danger btn-sm delete">X</a></td>
        `
        list.appendChild(row);
    }
    // 
    static deleteBook(el) { 
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
        
    }

    // Show alert box
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));

        // Container is the parent and we want to insert it before the form
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        // Make the alert disappear after 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    // Method to clear the input fields
    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

}

// Store Class: Handles Storage
// local storage stores key value pairs, 
// it has to be a string, it cannot be an object
class Store {
    static getBooks() {
        let books;
        // we wanna check if there no item called books
        if(localStorage.getItem('books') === null) {
            //  we want to set books to an empty array
            books = [];
        } else {
            // it's gonna be stored as a string, so we need to run this through a JSON.parse method,
            //  so we can treat it as a regular js array of objects
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        // fetch books from local storage
        const books = Store.getBooks();

        // we need to push on to it the book
        books.push(book);

        // we need to reset it to local storage, 
        // and we need to wrap the books in JSON.stringify method to actually add it
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        // we need to fetch the books
        const books = Store.getBooks();

        // we need to loops through it
        books.forEach((book, index) => {
            // we need to check if the isbn of the book that is being looped through
            //  matches the one passed as a parameter in the function
            if (book.isbn === isbn) {
                // if they match we are removing this book item
                books.splice(index, 1);
            }
        });

        // we need to reset local storage with that book removed
        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();

    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // Validate 
    if(title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill in all fields...', 'danger');
    } else {
        // Instantiate book
        const book = new Book(title, author, isbn);
        console.log('book: ', book);

        // Add Book to UI
        UI.addBookToList(book);

        // Show success message
        UI.showAlert("Book Added", "success");

        // Clear input fields
        UI.clearFields();
        }
    
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    // e.target is the element in the DOM that we're clicking on
    // console.log(e.target)
    // event propagation - we are targeting the actual book list, 
    // and then in the deleteBook method, if it contains the class delete, we remove it
    UI.deleteBook(e.target);

    // Show delete message
    UI.showAlert("Book Removed", "info");
})