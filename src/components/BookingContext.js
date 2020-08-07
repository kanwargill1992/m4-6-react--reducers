import React, { createContext, useReducer } from "react";

export const BookingContext = createContext();

const initialState = {
  status: "idle",
  error: null,
  selectedSeatId: null,
  price: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "begin-booking-process":
      return {
        ...state,
        status: "seat-selected",
        seatSelectedID: action.seat,
        price: action.price,
      };
    default:
      return state;
  }
};

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const beginBooingProcess = () => {
    dispatch({ type: "begin-booking-process" });
  };
  return (
    <BookingContext.Provider value={{ state, beginBooingProcess }}>
      {children}
    </BookingContext.Provider>
  );
};
