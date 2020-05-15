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
        const StoredBooks = [
            {
                title: 'Just Kids',
                author: 'Patti Smith',
                isbn: '181818'
            },
            {
                title: 'Ciganin, ali najljepsi',
                author: 'Kristian Novak',
                isbn: '232323'
            }
        ];

        const books = StoredBooks;

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
})