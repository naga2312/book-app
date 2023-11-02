package com.example.demo.service;

import com.example.demo.model.Book;

import java.util.List;

public interface BookServiceInterface {
    public List<Book> getAllBooks();

    public Book getBook(Long id);

    public Book addBook(Book book);

    public Book updateBook(Long id, Book book);

    public void deleteBook(Long id);

    public void deleteAllBooks();
}
