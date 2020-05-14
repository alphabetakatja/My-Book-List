td// Book Class: Represents a Book
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
}

// Store Class: Handles Storage

// Event: Display Books

// Event: Add a Book

// Event: Remove a Book