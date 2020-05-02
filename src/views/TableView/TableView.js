import React from 'react';
import styled from 'styled-components';
import Table from 'components/Table';

const Wrapper = styled.div`
  border: 2px solid red;
`;

const TableView = ({ children, positions, handleTablePage, sortingFunc }) => {
  const pageList = positions / 15;

  const createArray = (integer) => {
    let pageListArray = [];
    for (let i = 1; i < integer + 1; i++) {
      pageListArray.push(i);
    }
    return pageListArray;
  };
  const array = createArray(pageList);

  return (
    <Wrapper>
      <Table sortingFunc={sortingFunc}>{children}</Table>
      <p>
        strona
        <select id="pages" onChange={handleTablePage}>
          {array.map((item) => (
            <option value={item * 15 - 15} key={item}>
              {item}
            </option>
          ))}
        </select>{' '}
        z {pageList}
      </p>
    </Wrapper>
  );
};

export default TableView;
