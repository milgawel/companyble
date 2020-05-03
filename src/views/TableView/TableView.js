import React from 'react';
import styled from 'styled-components';
import Table from 'components/Table';

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const TableView = ({
  children,
  positions,
  handleTablePage,
  sortingFunc,
  filterFunc,
}) => {
  return (
    <Wrapper>
      <Table
        sortingFunc={sortingFunc}
        filterFunc={filterFunc}
        positions={positions}
        handleTablePage={handleTablePage}
      >
        {children}
      </Table>
    </Wrapper>
  );
};

export default TableView;
