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
  margin-top: 20px;
  margin-bottom: 20px;
`;

const StyledRowHeader = styled.tr`
  width: 100%;
  border-top: 2px solid black;
  background-color: green;
`;

const StyledRecord = styled.th`
  border: 2px solid black;
`;

class Table extends React.Component {
  state = {
    id: true,
    name: true,
    city: true,
    totalIncomes: true,
    avgIncomes: true,
    lastMonthIncomes: true,
  };

  render() {
    const { children, sortingFunc } = this.props;
    return (
      <Wrapper>
        <StyledTable>
          <tbody>
            <StyledRowHeader>
              <StyledRecord
                data-column="id"
                onClick={(e) => {
                  let sign = this.state.id ? '+' : '-';
                  sortingFunc(e, sign);
                  this.setState((prevState) => ({
                    id: !prevState.id,
                  }));
                }}
              >
                id
              </StyledRecord>
              <StyledRecord
                data-column="name"
                onClick={(e) => {
                  let sign = this.state.name ? '+' : '-';
                  sortingFunc(e, sign);
                  this.setState((prevState) => ({
                    name: !prevState.name,
                  }));
                }}
              >
                name
              </StyledRecord>
              <StyledRecord
                data-column="city"
                onClick={(e) => {
                  let sign = this.state.city ? '+' : '-';
                  sortingFunc(e, sign);
                  this.setState((prevState) => ({
                    city: !prevState.city,
                  }));
                }}
              >
                city
              </StyledRecord>
              <StyledRecord
                data-column="totalIncomes"
                onClick={(e) => {
                  let sign = this.state.totalIncomes ? '+' : '-';
                  sortingFunc(e, sign);
                  this.setState((prevState) => ({
                    totalIncomes: !prevState.totalIncomes,
                  }));
                }}
              >
                total income
              </StyledRecord>
              <StyledRecord
                data-column="avgIncomes"
                onClick={(e) => {
                  let sign = this.state.avgIncomes ? '+' : '-';
                  sortingFunc(e, sign);
                  this.setState((prevState) => ({
                    avgIncomes: !prevState.avgIncomes,
                  }));
                }}
              >
                average income
              </StyledRecord>
              <StyledRecord
                data-column="lastMonthIncomes"
                onClick={(e) => {
                  let sign = this.state.lastMonthIncomes ? '+' : '-';
                  sortingFunc(e, sign);
                  this.setState((prevState) => ({
                    lastMonthIncomes: !prevState.lastMonthIncomes,
                  }));
                }}
              >
                last month income
              </StyledRecord>
            </StyledRowHeader>

            {children.map((item) => {
              return (
                <Row
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  city={item.city}
                  incomes={item.incomes}
                  totalIncomes={item.totalIncomes}
                  avgIncomes={item.avgIncomes}
                  lastMonthIncomes={item.lastMonthIncomes}
                />
              );
            })}
          </tbody>
        </StyledTable>
      </Wrapper>
    );
  }
}

export default Table;
