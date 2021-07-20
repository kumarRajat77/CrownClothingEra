import { createSelector } from "reselect";

const selectCart = state => state.cart; //input selector

export const selectCartItems = createSelector( // memoized selector
  [selectCart],//collection of items
  cart => cart.cartItems // function that return value that we want out of this selector
)

export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
)

export const selectCartItemsCount = createSelector( // memoized selector
  [selectCartItems],
  cartItems => cartItems.reduce(
    (accumalatedQuantity, cartItem) =>
      accumalatedQuantity + cartItem.quantity,
      0
    ) 
)

export const selectCartTotal = createSelector(
  [selectCartItems],
  cartItems => cartItems.reduce(
    (accumalatedQuantity, cartItem) =>
      accumalatedQuantity + cartItem.quantity * cartItem.price,
      0
    ) 

  
)