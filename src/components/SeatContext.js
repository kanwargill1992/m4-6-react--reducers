import React, { createContext } from "react";

export const SeatContext = createContext();

const initialState = {
  hasLoaded: false,
  seats: null,
  numOfRows: 0,
  seatsPerRow: 0,
  bookedSeats: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "receive-seat-info-from-server":
      return {
        ...state,
        hasLoaded: true,
        seats: action.seats,
        bookedSeats: action.bookedSeats,
        numOfRows: action.numOfRows,
        seatsPerRow: action.seatsPerRow,
      };
    default:
      return state;
  }
};

export const SeatProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const receiveSeatInfoFromServer = (data) => {
    dispatch({
      type: "receive-seat-info-from-server",
      ...data,
    });
  };

  return (
    <SeatContext.Provider
      value={{ state, action: { receiveSeatInfoFromServer } }}
    >
      {children}
    </SeatContext.Provider>
  );
};
