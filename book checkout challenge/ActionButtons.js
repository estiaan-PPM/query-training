import * as React from "react";
import Loader from "./Loader";
import { useCheckoutBook, useReturnBook } from "./queries";

export function CheckoutButton({ book }) {
  const { mutate, isPending } = useCheckoutBook(book); {/*1*/}

  return (
    <button
      disabled={book.availableCopies === 0 || isPending}
      className="primary button"
      onClick={() => mutate()}
    >
      {isPending ? <Loader /> : "Checkout"} {/*2*/}
    </button>
  );
}

export function ReturnButton({ book }) {
  const { mutate, isPending } = useReturnBook(book);  {/*4*/}

  return (
    <button
      disabled={isPending}
      className="secondary button"
      onClick={() => mutate()}
    >
      {isPending ? <Loader /> : "Return Book"}  {/*5*/}
    </button>
  );
}