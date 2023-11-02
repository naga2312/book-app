var popupoverlay = document.querySelector(".popup-overlay")
var popupbox = document.querySelector(".popup-box")
var addpopupbutton = document.getElementById("add-button-popup")
var updateButton = document.getElementById("update-book")
var addButton = document.getElementById("add-book")

//Popup input field elements
var addbookBtn = document.getElementById("add-book")
var container = document.querySelector(".container")
var bookidEle = document.getElementById('book-id')
var booktitleEle = document.getElementById("book-title")
var bookauthorEle = document.getElementById("book-author")
var bookdescriptionEle = document.getElementById("book-description")

//Create new book card / container
function createBookCard(book) {
    var div = document.createElement("div")
        div.setAttribute("class", "book-container")
        div.setAttribute("data-id", book.id)
        div.innerHTML = '<h2 id="book-title-' + book.id + '">' + book.title + '</h2>'
                        + '<h5 id="book-author-' + book.id + '">'+ book.author  + '</h5>'
                        + '<p id="book-desc-' + book.id + '">' + book.description + '</p>'
                        + '<button onclick="deletebook(event)">Delete</button>'
                        + '<button onclick="editBook(event)">Edit</button>';
        container.append(div)
        popupoverlay.style.display = "none"
        popupbox.style.display = "none"
}

function updateBookContainer(book) {
    document.getElementById("book-title-" + book.id).innerHTML = book.title
    document.getElementById("book-author-" + book.id).innerHTML = book.author
    document.getElementById("book-desc-" + book.id).innerHTML = book.description
    popupoverlay.style.display = "none"
    popupbox.style.display = "none"
}

//Event Listeners
//Open Popup Event - to open add book form
addpopupbutton.addEventListener("click", function(){
    popupoverlay.style.display = "block"
    popupbox.style.display = "block"
    addButton.style.display = "inline"
    updateButton.style.display = "none"
})

//Close Popup event
var cancelpopup = document.getElementById("close-popup")
cancelpopup.addEventListener("click", function(event){
    event.preventDefault()
    popupoverlay.style.display = "none"
    popupbox.style.display = "none"
});

//Open Popup to open edit book form
function editBook(event) {
    var bookId = parseInt(event.target.parentNode.getAttribute('data-id'));
    bookidEle.value = bookId
    booktitleEle.value = document.getElementById("book-title-" + bookId).innerHTML
    bookauthorEle.value = document.getElementById("book-author-" + bookId).innerHTML
    bookdescriptionEle.value = document.getElementById("book-desc-" + bookId).innerHTML

    popupoverlay.style.display = "block"
        popupbox.style.display = "block"
        updateButton.style.display = "inline"
        addButton.style.display = "none"
}

//Add or Save Book Event
addbookBtn.addEventListener("click", function(event) {
    event.preventDefault()
    //ajax call - create book
    addBook({
        'title': booktitleEle.value,
        'author': bookauthorEle.value,
        'description': bookdescriptionEle.value
    });
});

//Update or Edit Book Event
updateButton.addEventListener("click", function(event) {
    //ajax  call - update book
    var book = {
        'id' : bookidEle.value,
        'title' : booktitleEle.value,
        'author' : bookauthorEle.value,
        'description' : bookdescriptionEle.value
    };
    updatebook(bookidEle.value, book)
})

//Delete Book event
function deletebook(event) {
    var bookId = parseInt(event.target.parentNode.getAttribute('data-id'));
    deleteBook(bookId, event.target.parentElement);
}



//Ajax calls to connect with Java application

$(document).ready(function() {
    //ajax call GET all book
    getAllBooks();
});

//Ajax call to get all books
function getAllBooks() {
    $.ajax({
        url: "http://localhost:9090/api/getAllBooks",
        method: "GET",
    }).then(function(books) {
        if (typeof books !== "undefined") {
            $.each(books, function (index, book) {
                createBookCard(book);
            });
        }
    });
}

//Ajax call to add new book
function addBook(book) {
    $.ajax({
       url: "http://localhost:9090/api/addBook",
       method: "POST",
       contentType: "application/json;charset=utf-8",
       data: JSON.stringify(book),
    }).then(function(response) {
       console.log(response);
       createBookCard(response);
    });
}

//Ajax call to Update/Edit book
function updatebook(bookid, book) {
    $.ajax({
        url: "http://localhost:9090/api/updateBook/" + bookid,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(book),
    }).then(function(response) {
        updateBookContainer(response)
    })
}

//Ajax call to Delete book
function deleteBook(bookId, bookCard){
    $.ajax({
        url: "http://localhost:9090/api/deleteBookById/" + bookId,
        method: "DELETE"
    }).then(function(response) {
        console.log(response);
        bookCard.remove();
    });
}