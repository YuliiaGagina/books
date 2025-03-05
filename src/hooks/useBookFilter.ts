import { useState, useMemo } from "react";
import { Book } from "../types";

export type FilterOption = "all" | "active" | "inactive";

export const useBookFilter = (books: Book[]) => {
  const [filter, setFilter] = useState<FilterOption>("all");

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      if (filter === "active") return book.isActive;
      if (filter === "inactive") return !book.isActive;

      return true; 

    });
  }, [books, filter]);

  return {
    filter,
    setFilter,
    filteredBooks,
    totalBooks: books.length,
    visibleBooks: filteredBooks.length,
  };
};
