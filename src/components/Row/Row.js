import React from 'react';
import styled from 'styled-components';

const StyledRecord = styled.th`
  border-bottom: 2px solid white;
  padding-top: 5px;
  padding-bottom: 5px;
  background: lightgray;
  font-size: 15px;
  @media (max-width: 420px) {
    padding-top: 3.5px;
    padding-bottom: 3.5px;
    font-size: 13.5px;
  }
`;

const Row = ({
  id,
  name,
  city,
  totalIncomes,
  avgIncomes,
  lastMonthIncomes,
}) => {
  return (
    <tr>
      <StyledRecord style={{ width: '10%' }}>{id}</StyledRecord>
      <StyledRecord>{name}</StyledRecord>
      <StyledRecord>{city}</StyledRecord>
      <StyledRecord>{totalIncomes}</StyledRecord>
      <StyledRecord>{avgIncomes}</StyledRecord>
      <StyledRecord>{lastMonthIncomes}</StyledRecord>
    </tr>
  );
};

export default Row;
