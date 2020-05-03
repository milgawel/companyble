import React from 'react';
import styled from 'styled-components';

const StyledRow = styled.tr``;

const StyledRecord = styled.th`
  border-bottom: 2px solid white;
  padding-top: 5px;
  padding-bottom: 5px;
  background: lightgray;
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
    <StyledRow>
      <StyledRecord style={{ width: '10%' }}>{id}</StyledRecord>
      <StyledRecord>{name}</StyledRecord>
      <StyledRecord>{city}</StyledRecord>
      <StyledRecord>{totalIncomes}</StyledRecord>
      <StyledRecord>{avgIncomes}</StyledRecord>
      <StyledRecord>{lastMonthIncomes}</StyledRecord>
    </StyledRow>
  );
};

export default Row;
