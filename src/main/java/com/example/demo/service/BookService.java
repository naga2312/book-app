package com.example.demo.service;

import com.example.demo.model.Book;
import com.example.demo.repo.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BookService implements BookServiceInterface {

    @Autowired
    BookRepository bookRepository;

    Set<Long> demoBooks = new HashSet<>(Arrays.asList(1L,2L));
    public List<Book> getAllBooks() {
       List<Book> books = bookRepository.findAll();

       List<Book> resultBooks = new ArrayList<>();
       for(Book book : books) {
           if (!demoBooks.contains(book.getId())){
               resultBooks.add(book);
           }
       }

       return resultBooks;
    }

    public Book getBook(Long id){
        Optional<Book> retrivalBook = bookRepository.findById(id);
        if (retrivalBook.isPresent()) {
            return retrivalBook.get();
        }
        return null;
    }

    public Book addBook(Book book) {
        Book savedBook = bookRepository.save(book);
        return savedBook;
    }

    public Book updateBook(Long id, Book book){
        Optional<Book> bookOptional = bookRepository.findById(id);
        if(bookOptional.isPresent()) {
            Book editedBook = bookOptional.get();
            editedBook.setTitle(book.getTitle());
            editedBook.setAuthor(book.getAuthor());
            editedBook.setDescription(book.getDescription());

            return bookRepository.save(editedBook);
        }
        return null;
    }

    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }

    public void deleteAllBooks() {
        bookRepository.deleteAll();
    }
}


