import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getMyBooks, getBook, checkoutBook, returnBook } from "./utils";

export function useCheckoutBook(book) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => checkoutBook(book.id),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["books"] });
    }
  });
}

export function useReturnBook(book) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => returnBook(book.id),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["books"] });
    }
  });
}

export function useBookQuery(bookId) {
  return useQuery({
    queryKey: ["books", "detail", bookId],
    queryFn: () => getBook(bookId)
  });
}

export function useMyBooks() {
  return useQuery({
    queryKey: ["books", "my-books"],
    queryFn: getMyBooks
  });
}
