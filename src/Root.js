import React from 'react';
import MainTemplate from 'templates/MainTemplate';
import TableView from 'views/TableView';

class Root extends React.Component {
  state = {
    companies: [],
    filteredCompanies: [],
    offset: 0,
  };

  calculateTotalIncomes = (arrayOfIncomes) => {
    let totalIncome = 0;

    for (let i = 0; i < arrayOfIncomes.length; i++) {
      totalIncome += parseFloat(arrayOfIncomes[i].value, 10);
    }
    totalIncome = Math.round(totalIncome * 100) / 100;

    return totalIncome;
  };

  calculateAverageIncomes = (arrayOfIncomes) => {
    let avgIncome = 0;

    for (let i = 0; i < arrayOfIncomes.length; i++) {
      avgIncome += parseFloat(arrayOfIncomes[i].value, 10);
    }

    avgIncome = avgIncome / arrayOfIncomes.length;

    avgIncome = Math.round(avgIncome * 100) / 100;

    return avgIncome;
  };

  calculateLastMonthIncome = (arrayOfIncomes) => {
    let lastMonthIncome = 0;
    const date = new Date();
    const thisYear = date.getFullYear();
    let prevMonth = date.getMonth();
    if (prevMonth < 10) prevMonth = `0${prevMonth}`;

    for (let i = 0; i < arrayOfIncomes.length; i++) {
      const month = arrayOfIncomes[i].date.substring(5, 7);
      const year = arrayOfIncomes[i].date.substring(0, 4);

      if (month === prevMonth && year === thisYear) {
        console.log(`[year = thisyear]${year} ===${thisYear}`);
        console.log(`[arrayOfIncomes[i].date] ${arrayOfIncomes[i].date}`);
        console.log(`[month = actualMonth]${month} ===${prevMonth}`);
        lastMonthIncome += parseFloat(arrayOfIncomes[i].value, 10);
      }
    }
    return lastMonthIncome;
  };

  fetchCompaniesDataFromServer = () => {
    fetch('https://recruitment.hal.skygate.io/companies')
      .then((response) => response.json())
      .then((data) => {
        let completeData = data;
        for (let i = 0; i < data.length; i++) {
          fetch(`https://recruitment.hal.skygate.io/incomes/${data[i].id}`)
            .then((response) => response.json())
            .then((data) => {
              completeData[i].incomes = [...data.incomes];

              completeData[i].totalIncomes = this.calculateTotalIncomes(
                completeData[i].incomes,
              );

              completeData[i].avgIncomes = this.calculateAverageIncomes(
                completeData[i].incomes,
              );
              completeData[i].lastMonthIncomes = this.calculateLastMonthIncome(
                completeData[i].incomes,
              );
              this.setState({
                companies: completeData,
              });
            })
            .catch((err) => console.log(err));
        }

        this.setState({
          companies: completeData,
        });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.fetchCompaniesDataFromServer();
  }

  handleTablePage = (e) => {
    this.setState({
      offset: parseInt(e.target.value),
    });
  };

  handleSorting = (e, sign) => {
    let sortType = e.target.getAttribute('data-column');
    let newArrayToSort = this.state.companies;
    let filteredNewArrayToSort = this.state.filteredCompanies;

    function dynamicSort(property) {
      let sortOrder = 1;
      if (sign === '-') {
        sortOrder = -1;
      }

      return function (a, b) {
        const result =
          a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        return result * sortOrder;
      };
    }

    newArrayToSort.sort(dynamicSort(sortType));
    filteredNewArrayToSort.sort(dynamicSort(sortType));

    this.setState({
      companies: newArrayToSort,
      filteredCompanies: filteredNewArrayToSort,
    });
  };

  handleInputFilter = (e) => {
    const { companies } = this.state;
    const input = e.target.value.toString().toLowerCase();
    console.log(input);
    const type = e.target.getAttribute('data-filter');

    if (input.length > 0) {
      const filteredCompanies = companies.filter((obj) =>
        obj[type].toString().toLowerCase().includes(input),
      );
      this.setState({
        filteredCompanies,
      });
    } else {
      this.setState({
        filteredCompanies: [],
      });
    }
  };

  render() {
    const { companies, filteredCompanies, offset } = this.state;

    return (
      <MainTemplate>
        <TableView
          filterFunc={this.handleInputFilter}
          sortingFunc={this.handleSorting}
          positions={this.state.companies.length}
          page={this.state.page}
          handleTablePage={this.handleTablePage}
        >
          {filteredCompanies.length > 0
            ? filteredCompanies.slice(offset, offset + 15)
            : companies.slice(offset, offset + 15)}
        </TableView>
      </MainTemplate>
    );
  }
}

export default Root;
