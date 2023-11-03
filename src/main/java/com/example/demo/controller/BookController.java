package com.example.demo.controller;

import com.example.demo.model.Book;
import com.example.demo.repo.BookRepository;
import com.example.demo.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class BookController {
    @Autowired
    BookService bookService;

    @GetMapping("/getAllBooks")
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> storedBooks = bookService.getAllBooks();
        return new ResponseEntity<>(storedBooks, HttpStatus.OK);
    }

    @GetMapping("/getBookById/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        Book retrivalBook = bookService.getBook(id);
        return new ResponseEntity<>(retrivalBook, HttpStatus.OK);
    }

    @GetMapping("/getBook")
    public ResponseEntity<Book> getBook(@RequestParam(value = "id") Long id) {
        Book retrivalBook = bookService.getBook(id);
        return new ResponseEntity<>(retrivalBook, HttpStatus.OK);
    }

    @PostMapping("/addBook")
    public ResponseEntity<Book> addBook(@RequestBody Book book) {
        Book newBook = bookService.addBook(book);
        return new ResponseEntity<>(newBook, HttpStatus.CREATED);

    }

    @PutMapping("/updateBook/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book book) {
        Book updatedbook = bookService.updateBook(id, book);
        if(updatedbook != null) {
            return new ResponseEntity<>(updatedbook, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    @DeleteMapping("/deleteBookById/{id}")
    public ResponseEntity<HttpStatus> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @DeleteMapping("/deleteAllBooks")
    public ResponseEntity<HttpStatus> deleteAllBooks() {
        bookService.deleteAllBooks();
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
