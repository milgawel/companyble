import React from 'react';
import Row from 'components/Row';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;
const StyledTable = styled.table`
  width: 100%;
  overflow-x: scroll;
  /* table-layout: fixed; */
`;

const StyledRowHeader = styled.tr`
  width: 100%;
  border-top: 2px solid black;
  background-color: green;
`;

const StyledRow = styled.tr`
  width: 100%;
  border-top: 2px solid black;
  background-color: lightgreen;
`;

const StyledRecord = styled.th`
  border: 2px solid black;
`;

class Table extends React.Component {
  state = {
    filteredBy: 'id',
  };

  handleFilter = () => {};

  render() {
    const { children } = this.props;
    return (
      <Wrapper>
        <h1>Table</h1>
        <p>pagination</p>
        <StyledTable>
          <tbody>
            <StyledRowHeader>
              <StyledRecord>id</StyledRecord>
              <StyledRecord>name</StyledRecord>
              <StyledRecord>city</StyledRecord>
              <StyledRecord>total income</StyledRecord>
              <StyledRecord>average income</StyledRecord>
              <StyledRecord>last month income</StyledRecord>
            </StyledRowHeader>

            {children.map((item) => (
              <Row
                key={item.id}
                id={item.id}
                name={item.name}
                city={item.city}
              />
            ))}
          </tbody>
        </StyledTable>
      </Wrapper>
    );
  }
}

export default Table;
