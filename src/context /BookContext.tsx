import { Children, createContext, Dispatch, SetStateAction, useEffect, useState   } from "react";
import {Book} from '../types'

export type BooksContextType = {

    books : Book[];

    saveBook: (book: Book) => void;
    updateBook: (updatedBook: Book) => void;
    deleteBook: (id: number) => void;
    getBooks: () => void;
    toggleActiveStatus: (id: number) => void;

}


export const BooksContext = createContext<BooksContextType | null>(null )



type BooksProviderProps = {
    children : React.ReactNode

}

export default function BooksProvider({children} : BooksProviderProps){
    const [books , setBooks] = useState<Book[]>([]);

    const getBooks = async () => {
        const response = await fetch('http://localhost:5000/books');
        const data = await response.json();
        setBooks(data);
    }

    const saveBook = async (book: Book) => {
        const response = await fetch('http://localhost:5000/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book),
        });
        if (response.ok) {
            getBooks(); // Обновляем список книг
        }
    }


    const updateBook = async (updatedBook: Book) => {
        const response = await fetch(`http://localhost:5000/books/${updatedBook.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedBook),
        });
        if (response.ok) {
            getBooks(); // Обновляем список книг
        }
    }

    const toggleActiveStatus = (id: number) => {
        const updatedBooks = books.map((book) =>
          book.id === id ? { ...book, isActive: !book.isActive } : book
        );
        setBooks(updatedBooks);
    
        fetch(`http://localhost:5000/books/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isActive: !books.find((b) => b.id === id)?.isActive }),
        });
      };

    const deleteBook = async (id: number) => {
        const response = await fetch(`http://localhost:5000/books/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            getBooks(); // Обновляем список книг
        }
    }

    useEffect(() => {
        getBooks();
    }, []);



    return <BooksContext.Provider value={{books, saveBook, updateBook, deleteBook, getBooks, toggleActiveStatus}}>
    {children}
    </BooksContext.Provider>

}