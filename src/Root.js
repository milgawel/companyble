import React from 'react';
import MainTemplate from 'templates/MainTemplate';
import TableView from 'views/TableView';

class Root extends React.Component {
  state = {
    companies: [],
    positions: 0,
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
    // określony last moth income
    let lastMonthIncome = 0;
    // określony ten rok i poprzedni miesiąc
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
        // completeData.sort(function (a, b) {
        //   return a.id - b.id;
        // });

        // ##############################
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
          positions: completeData.length,
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
    // sortType = `${sign}${sortType}`;
    console.log(`[sortType] ${sortType}`);

    function dynamicSort(property) {
      var sortOrder = 1;
      // console.log(property[0]);
      // console.log(typeof property[0]);
      // if (property[0] === '-') {
      if (sign === '-') {
        sortOrder = -1;
        console.log(`z minusem lecimy w dół`);
      }
      // property = property.substr(1);
      console.log(`z plusem lecimy w górę`);
      return function (a, b) {
        /* next line works with strings and numbers,
         * and you may want to customize it to your needs
         */
        var result =
          a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        return result * sortOrder;
      };
    }

    newArrayToSort.sort(dynamicSort(sortType));

    this.setState({
      companies: newArrayToSort,
    });
  };

  render() {
    const { companies, offset } = this.state;
    return (
      <MainTemplate>
        <TableView
          sortingFunc={this.handleSorting}
          positions={this.state.positions}
          page={this.state.page}
          handleTablePage={this.handleTablePage}
        >
          {companies.slice(offset, offset + 15)}
        </TableView>
      </MainTemplate>
    );
  }
}

export default Root;
