import React, { useContext, useEffect } from 'react'

import {  formatInTimeZone } from "date-fns-tz";
import { ToastContainer, toast } from "react-toastify";

import { BooksContext, BooksContextType } from '../context /BookContext'
import { Book } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import { FilterOption, useBookFilter } from '../hooks/useBookFilter';
import Header from '../components/Header';



const Dashboard = () => {
    const { books, deleteBook, updateBook, toggleActiveStatus } = useContext(BooksContext) as BooksContextType;
    const { filter, setFilter, filteredBooks, totalBooks, visibleBooks } = useBookFilter(books);
    const navigate = useNavigate();





    const handleDelete = (id: number) => {
        const bookToDelete = books.find(book => book.id === id);
    
        if (!bookToDelete) {
            toast.error("Book wasn`t found");
            return;
        }
    
        if (!bookToDelete.isActive) {
            deleteBook(id);
            toast.success("The book deleted successfully");
        } else {
            toast.warning("Sorry, you can`t delete active book!");
        }
    };

    const handleEdit = (book: Book) => {
        navigate( `/edit/${book.id}`);
        console.log('Edit book:', book);
    }
   

    const handleChangeStatusOfBook = (id: number)=>{
        toggleActiveStatus(id)
    }

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

 

    const formatDate = (isoString: string) => {
        return formatInTimeZone(isoString, userTimeZone, "dd MMMM yyyy, hh:mm aaaa");
    };

  

    return books.length > 1 ? (
        <>
          <div className='content'>
            <div className='filter-container'>
              <label>Filter: </label>
              <select value={filter} onChange={(e) => setFilter(e.target.value as FilterOption)}>
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Not active</option>
              </select>
            </div>
            <h1>Books Dashboard</h1>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>Created at</th>
                  <th>Updated at</th>
                  <th>Active</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book: Book) => (
                  <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.category}</td>
                    <td>{formatDate(book.createdAt)}</td>
                    <td>{book.updatedAt ? formatDate(book.updatedAt) : '—'}</td>
                    <td className={book.isActive ? 'status-active' : 'status-inactive'}>
                      {book.isActive ? 'Active' : 'Not Active'}
                    </td>
                    <td>
                      <button onClick={() => handleEdit(book)}>Edit</button>
                      <button onClick={() => handleDelete(book.id)}>Delete</button>
                      <button onClick={() => handleChangeStatusOfBook(book.id)}>Activate/Re-Activate</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='wrap'>
              <p>numberBasedOnFilterSelection: {totalBooks}</p>
              <p>totalNumberOfRecordsInDB: {visibleBooks}</p>
            </div>
          </div>
          <ToastContainer />
        </>
      ) : null; 
    }

export default Dashboard



