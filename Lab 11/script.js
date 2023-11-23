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
    /* ChatGPT Prompt: If I was asked to implement a function to make a request to the Google Books APILinks to an external site when the user searches for books using the search button, then
     process the API response to retrieve book data, how would I write that in JavaScript. */
     // creating the API URL by encoding the search text and adding it to the end of the URL
     // used this link to understand the Fetch API before proceeding: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
     // creating the API URL by encoding the search text and adding it to the end of the URL.
    const bookAPIUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchText)}`;

    // fetching the data from the API URL
    fetch(bookAPIUrl)
        .then(response => response.json()) // Converting the response to JSON
        .then(data => showBooks(data.items)) // Passing the book data to the showBooks function
        .catch(error => console.error("Error:", error)); // Logging any errors to the console
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
        // creating a button to toggle the display of additional details
        const button = document.createElement('button');
        button.textContent = 'Details';
        // when the button is clicked, call the showDetails function to show/hide book details
        button.onclick = () => showDetails(bookItem, book.volumeInfo);
        
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
