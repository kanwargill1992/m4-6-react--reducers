import React, { useContext } from "react";
import styled from "styled-components";
import { getRowName, getSeatNum } from "../helpers";
import { BookingContext } from "./BookingContext";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import seat from "../assets/seat-available.svg";

const Seat = ({ rowIndex, seatIndex, width, height, price, isBooked }) => {
  const { beginBookingProcess } = useContext(BookingContext);
  return (
    <Tippy
      content={`Row ${getRowName(rowIndex)}, Seat ${getSeatNum(
        seatIndex
      )}-$${price}`}
    >
      <ImageWrapper
        isBooked={isBooked}
        disabled={isBooked}
        onClick={() => beginBookingProcess}
      >
        <SeatImage src={seat} alt="seat" width={width} height={height} />
      </ImageWrapper>
    </Tippy>
  );
};
const ImageWrapper = styled.button`
  cursor: pointer;
`;
const SeatImage = styled.img`
  filter: ${(num) => (num.isBooked ? "grayscale(100%" : "")};
`;

export default Seat;
