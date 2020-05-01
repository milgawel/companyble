import React from 'react';
import styled from 'styled-components';
import Table from 'components/Table';

const Wrapper = styled.div`
  border: 2px solid red;
`;

const TableView = ({ children }) => (
  <Wrapper>
    <Table>{children}</Table>
  </Wrapper>
);

export default TableView;
