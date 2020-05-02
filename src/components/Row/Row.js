import React from 'react';
import styled from 'styled-components';

const StyledRow = styled.tr`
  width: 100%;
  border-top: 2px solid black;
  background-color: lightgreen;
`;

const StyledRecord = styled.th`
  border: 2px solid black;
`;

const Row = ({
  id,
  name,
  city,
  totalIncomes,
  avgIncomes,
  lastMonthIncomes,
}) => {
  // console.log(`[id]${id}`);
  // console.log(`[name]${name}`);
  // console.log(`[city]${city}`);
  // console.log(`[totalIncomes]${totalIncomes}`);
  // console.log(`[avgIncomes]${avgIncomes}`);
  // console.log(`[lastMonthIncomes]${lastMonthIncomes}`);

  return (
    <StyledRow>
      <StyledRecord>{id}</StyledRecord>
      <StyledRecord>{name}</StyledRecord>
      <StyledRecord>{city}</StyledRecord>
      <StyledRecord>{totalIncomes}</StyledRecord>
      <StyledRecord>{avgIncomes}</StyledRecord>
      <StyledRecord>{lastMonthIncomes}</StyledRecord>
    </StyledRow>
  );
};

export default Row;
