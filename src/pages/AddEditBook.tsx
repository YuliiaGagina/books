import React, { useState, useContext, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import {  useNavigate, useParams } from 'react-router-dom'; 
import { Book } from "../types";
import { BooksContext } from '../context /BookContext';

const AddEditBood = ({ book }: { book?: Book | null   }) => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); 
    const [newBook, setNewBook] = useState<Book>({
        id: 0,
        title: "",
        author: "",
        category: "",
        isbn: "",
        createdAt: "",
        updatedAt: null,
        isActive: false,
      });
    const { saveBook, updateBook } = useContext(BooksContext) as any;


    useEffect(() => {

        if (id) {
          fetch(`http://localhost:5000/books/${id}`)
            .then((res) => res.json())
            .then((data) => setNewBook(data))
            .catch((err) => console.error("Erros with loading books, check your server", err));
           
        }
      }, [id]);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setNewBook({ ...newBook, [e.target.name]: e.target.value });
      };


      const validateForm = () => {
        const { title, author, category, isbn } = newBook;

      
        if (!/^\d{13}$/.test(isbn)) {
            toast.error("ISBN must be 13 numbers");
            return false;
        }

       
        if (!/^[a-zA-Z0-9\s.,:;!?'"()-]{1,150}$/.test(title)) {
            toast.error("name should be less 150 signs");
            return false;
        }

        
        if (!/^[a-zA-Z\s]{1,100}$/.test(author)) {
            toast.error("Author shoud be less 100signs");
            return false;
        }

        
        if (category.length > 50) {
            toast.error("Categories shold be less than 50 signs");
            return false;
        }

        return true;
    };


      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }
    
        if (id) {
            const updatedNewBook = {...newBook,  updatedAt: new Date().toISOString() }

          updateBook(updatedNewBook);
        
          toast.success("Book updated successfully!", { onClose: () => navigate("/") });
        
        } else {
          const newCreatedBook = { ...newBook, id: Date.now().toString(), createdAt: new Date().toISOString() };
          saveBook(newCreatedBook);
          toast.success("Book added successfully!", { onClose: () => navigate("/") });
       
        }
    
        
      };

    return (
        <div className='form-container'>

<h1>{id ? "Edit Book" : "Add a Book"}</h1>

<form onSubmit={handleSubmit}>
        <input type="text" name="title" value={newBook?.title} onChange={handleChange} placeholder="Title" required />
        <input type="text" name="author" value={newBook?.author} onChange={handleChange} placeholder="Author" required />
        <input type="text" name="category" value={newBook?.category} onChange={handleChange} placeholder="Category" required />
        <input type="text" name="isbn" value={newBook?.isbn} onChange={handleChange} placeholder="ISBN" required />

        <button type="submit">{id ? "Update Book" : "Add Book"}</button>
      </form>


        <button onClick={() => navigate("/")}>Go to Dashboard</button>
        
        <ToastContainer />
        </div>
     
    );
}

export default AddEditBood;

