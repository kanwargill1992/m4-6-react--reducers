import React, { useContext } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { SeatContext } from "./SeatContext";
import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";
import Seat from "./Seat";

const TicketWidget = () => {
  const { state } = useContext(SeatContext);
  const numOfRows = state.numOfRows;
  const seatsPerRow = state.seatsPerRow;

  // TODO: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag
  if (state.hasLoaded) {
    return (
      <Wrapper>
        {range(numOfRows).map((rowIndex) => {
          const rowName = getRowName(rowIndex);

          return (
            <Row key={rowIndex}>
              <RowLabel>Row {rowName}</RowLabel>
              {range(seatsPerRow).map((seatIndex) => {
                const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
                const seat = state.seats[seatId];
                return (
                  <SeatWrapper key={seatId}>
                    <Seat
                      key={seatId}
                      rowIndex={rowIndex}
                      seatIndex={seatIndex}
                      width={36}
                      height={36}
                      price={seat.price}
                      isBooked={state.bookedSeats[seatId]}
                    />
                  </SeatWrapper>
                );
              })}
            </Row>
          );
        })}
      </Wrapper>
    );
  } else {
    return (
      <Wrapper1>
        <CircularProgress />
      </Wrapper1>
    );
  }
};

const Wrapper = styled.div`
  background: #91c1a9;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
`;

const Wrapper1 = styled.div`
  background-color: #bbb;
  display: flex;
  justify-content: center;
`;

const Row = styled.div`
  display: flex;
  position: relative;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const RowLabel = styled.div`
  font-weight: bold;
`;

const SeatWrapper = styled.div`
  padding: 5px;
`;

export default TicketWidget;
