import React from 'react';
import Row from 'components/Row';
import styled from 'styled-components';
import arrows from 'assets/image.png';

const Wrapper = styled.div`
  min-width: 900px;
  max-width: 1400px;
  padding-top: 20px;
  margin: 0 auto;
`;
const StyledTable = styled.table`
  width: 100%;
  table-layout: fixed;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  border: 3px solid black;
`;

const StyledRowHeader = styled.tr`
  width: 100%;
  background-color: #334960;
  color: white;
`;

const StyledRowInput = styled.tr`
  background-image: linear-gradient(to bottom, #334960, lightgrey);
`;

const StyledSortRecord = styled.th`
  border: 2px solid #334960;
  padding: 5px 30px 5px 10px;
  min-width: 60px;
  cursor: pointer;
  background-image: url(${arrows});
  background-repeat: no-repeat;
  background-size: 23px;
  background-position: 95% 50%;
`;

const StyledInput = styled.input`
  color: black;
  background-color: transparent;
  width: 100%;
  min-width: 60px;
  padding: 5px;
  text-align: center;
  font-size: 15px;
  border: none;
  ::placeholder {
    color: black;
  }
`;

const StyledParagraph = styled.p`
  width: 150px;
  position: relative;
  display: block;
  margin-right: 10px;
  margin-left: auto;
  margin-top: 10px;
  font-weight: bold;
`;

const StyledSelect = styled.select`
  height: 22px;
  transform: translateY(-2px);
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
    const {
      children,
      sortingFunc,
      filterFunc,
      handleTablePage,
      positions,
    } = this.props;

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
        <StyledTable>
          <tbody>
            <StyledRowHeader>
              <StyledSortRecord
                style={{ width: '7%' }}
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
              </StyledSortRecord>
              <StyledSortRecord
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
              </StyledSortRecord>
              <StyledSortRecord
                style={{ width: '20%' }}
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
              </StyledSortRecord>
              <StyledSortRecord
                style={{ width: '13%' }}
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
              </StyledSortRecord>
              <StyledSortRecord
                style={{ width: '15%' }}
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
              </StyledSortRecord>
              <StyledSortRecord
                style={{ width: '17%' }}
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
              </StyledSortRecord>
            </StyledRowHeader>
            <StyledRowInput>
              <th>
                <StyledInput
                  data-filter="id"
                  onChange={(e) => filterFunc(e)}
                  placeholder="filter"
                />
              </th>
              <th>
                <StyledInput
                  data-filter="name"
                  onChange={(e) => filterFunc(e)}
                  placeholder="filter"
                />
              </th>
              <th>
                <StyledInput
                  data-filter="city"
                  onChange={(e) => filterFunc(e)}
                  placeholder="filter"
                />
              </th>
              <th>
                <StyledInput
                  data-filter="totalIncomes"
                  onChange={(e) => filterFunc(e)}
                  placeholder="filter"
                />
              </th>
              <th>
                <StyledInput
                  data-filter="avgIncomes"
                  onChange={(e) => filterFunc(e)}
                  placeholder="filter"
                />
              </th>
              <th>
                <StyledInput
                  data-filter="totalIncomes"
                  onChange={(e) => filterFunc(e)}
                  placeholder="filter"
                />
              </th>
            </StyledRowInput>
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
        <StyledParagraph>
          Page{' '}
          <StyledSelect id="pages" onChange={handleTablePage}>
            {array.map((item) => (
              <option value={item * 15 - 15} key={item}>
                {item}
              </option>
            ))}
          </StyledSelect>{' '}
          of {pageList}
        </StyledParagraph>
      </Wrapper>
    );
  }
}

export default Table;
