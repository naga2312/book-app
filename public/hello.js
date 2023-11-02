$(document).ready(function() {
    $.ajax({
        url: "http://localhost:9090/greeting"
    }).then(function(data) {
       $('.greeting-id').append(data.id);
       $('.greeting-content').append(data.content);
    });

    addBook({title: "Title2", author: "Author2"});
    addBook({title: "Title3", author: "Author3"});
    addBook({title: "Title4", author: "Author4"});


    function addBook(book) {
        $.ajax({
           url: "http://localhost:9090/api/addBook",
           method: "POST",
           contentType: "application/json;charset=utf-8",
           data: JSON.stringify(book),
        }).then(function(response) {
           console.log(response);
        });
    }

    setTimeout(getAllBooks, 2000);

    function getAllBooks() {
        $.ajax({
            url: "http://localhost:9090/api/getAllBooks",
            method: "GET",
        }).then(function(books) {
            $.each(books, function (index, book) {
                createBookDiv(book);
            });
        });
    }

    function createBookDiv(book) {
        let bookDiv = '<div class="book">' +
            '<div>' + book.title + '</div>' +
            '<div>' + book.author + '</div>' +
        '</div>';
        $('#book-container').append(bookDiv);
    }
});