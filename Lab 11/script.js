// this is looking for a click event on the search button and call the searchForBooks function when it happens
document.getElementById('searchButton').addEventListener('click', searchForBooks);

// this function handles the search operation
function searchForBooks() {
    // taking the value that the user typed into the search input field
    const searchText = document.getElementById('searchInput').value;
    // if the search input is empty, then the user is alerted and the function stops
    if (!searchText) {
        alert("Please enter a search term.");
        return;
    }

    // used information from lecture slides and ChatGPT to write this part
    /* ChatGPT Prompt: If I was asked to implement a function to make a request to the Google Books API when the user searches for books using the search button, then
     process the API response to retrieve book data, how would I write that in JavaScript. */
     // used this link to understand the Fetch API before proceeding: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
     // creating the API URL by encoding the search text and adding it to the end of the URL
    const bookAPIUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchText)}`;

    // fetching the data from the API URL
    fetch(bookAPIUrl)
        .then(response => response.json()) // converting the response to JSON
        .then(data => showBooks(data.items)) // passing the book data to the showBooks function
        .catch(error => console.error("Error:", error)); // logging any errors to the console
}

// this function displays the books in the browser
function showBooks(books) {
    // finding the book list container and clearing any existing content
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = ''; 

    // here I am looping over each book in the array
    books.forEach(book => {
        // creating a new div element for each book and adding them to the 'book-item' class
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');
        // creating a new h3 element for the book title and setting its text
        const title = document.createElement('h3');
        title.textContent = book.volumeInfo.title;
        bookItem.appendChild(title);
        // creating a button to toggle the display of additional details
        const button = document.createElement('button');
        button.textContent = 'Details';
        // when the button is clicked, call the showDetails function to show/hide book details
        button.onclick = () => showDetails(bookItem, book.volumeInfo);
        bookItem.appendChild(button);
        
        // creating a button to add the book to the bookshelf
        const addButton = document.createElement('button');
        addButton.textContent = 'Add to Bookshelf';
        // when the button is clicked, call the addToBookshelf function to add the book to the bookshelf
        addButton.onclick = () => addToBookshelf(book);
        bookItem.appendChild(addButton);
        
        // adding the title and button to the book item div
        bookItem.appendChild(title);
        bookItem.appendChild(button);
        // adding the book item div to the main book list container
        bookList.appendChild(bookItem);
    });
}

// this function shows or hides additional details for a given book item
function showDetails(bookItem, details) {
    // checking if the details div already exists
    let detailsDiv = bookItem.querySelector('.details');
    if (detailsDiv) {
        // if it exists, remove it to hide details
        bookItem.removeChild(detailsDiv);
    } else {
        // if it doesn't exist, create it and fill it with book details
        detailsDiv = document.createElement('div');
        detailsDiv.classList.add('details');
        
        // getting the author, ISBN, and page count from the book details, providing fallbacks if any of them is not available
        const authors = details.authors ? details.authors.join(', ') : 'No authors listed';
        const isbn = details.industryIdentifiers ? details.industryIdentifiers.map(identifier => identifier.identifier).join(', ') : 'No ISBN available';
        const pageCount = details.pageCount ? details.pageCount : 'No page count available';

        // setting the text content for the details div with all the book details
        detailsDiv.textContent = `Authors: ${authors} | Published Date: ${details.publishedDate} | ISBN: ${isbn} | Page Count: ${pageCount}`;
        // adding the details div to the book item div
        bookItem.appendChild(detailsDiv);
    }
}

// BONUS: Bookshelf - used ChatGPT prompt to help write this part, is not fully working, but still wanted partial bonus points
/* ChatGPT Prompt: How could I edit my current code so that I can create a bookshelf that stores books that the user has added? This bookshelf should be saved to local storage, 
so a refresh of the page will not remove it. Also, the user should be able to view their bookshelf, see details of the book within it, and remove books from it. */
// you are able to add and remove books from the bookshelf, and when you refresh the page, the bookshelf is still there, but I could not get the details to show up when you click the button

// this function adds a book to the bookshelf
function addToBookshelf(book) {
    let bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    // checking if the book is already in the bookshelf
    bookshelf.push(book);
    localStorage.setItem('bookshelf', JSON.stringify(bookshelf));
    displayBookshelf(); 
}
// this function displays the bookshelf
function displayBookshelf() {
    const bookshelfList = document.getElementById('bookshelfList');
    bookshelfList.innerHTML = '';
    
    // get the bookshelf from local storage, or an empty array if it's not set yet
    let bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    bookshelf.forEach(book => {
        // create a new list item for each book and add it to the bookshelf list
        const li = document.createElement('li');
        li.textContent = book.volumeInfo.title;

        // create a button to view details and remove the book
        const viewDetailsButton = document.createElement('button');
        viewDetailsButton.textContent = 'View Details';
        viewDetailsButton.onclick = () => showDetails(book.volumeInfo);
        li.appendChild(viewDetailsButton);
        
        // create a button to remove the book from the bookshelf
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeFromBookshelf(book);
        li.appendChild(removeButton);
        
        bookshelfList.appendChild(li);
    });
}

// this function removes a book from the bookshelf
function removeFromBookshelf(bookToRemove) {
    let bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    // filter out the book to remove
    bookshelf = bookshelf.filter(book => book.id !== bookToRemove.id);
    // save the updated bookshelf to local storage
    localStorage.setItem('bookshelf', JSON.stringify(bookshelf));
    displayBookshelf(); // update the bookshelf display
}

// calling displayBookshelf on page load to show the stored bookshelf
window.onload = displayBookshelf;