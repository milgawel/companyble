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

const Row = ({ id, name, city }) => (
  <StyledRow>
    <StyledRecord>{id}</StyledRecord>
    <StyledRecord>{name}</StyledRecord>
    <StyledRecord>{city}</StyledRecord>
  </StyledRow>
);

export default Row;
