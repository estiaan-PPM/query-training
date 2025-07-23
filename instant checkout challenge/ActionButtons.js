import * as React from "react";
import { useCheckoutBook, useReturnBook } from "./queries";
import Loader from "./Loader";

export function CheckoutButton({ book }) {
  const { mutate, isPending } = useCheckoutBook(book);

  return (
    <button
      disabled={book.availableCopies === 0 || isPending}
      className="primary button"
      onClick={() => mutate()}
    >
      {isPending ? <Loader /> : "Checkout"}
    </button>
  );
}

export function ReturnButton({ book }) {
  const { mutate, isPending } = useReturnBook(book);

  return (
    <button
      disabled={isPending}
      className="secondary button"
      onClick={() => mutate()}
    >
      {isPending ? <Loader /> : "Return Book"}
    </button>
  );
}
