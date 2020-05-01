import React from 'react';
import MainTemplate from 'templates/MainTemplate';
import TableView from 'views/TableView';

class Root extends React.Component {
  state = {
    companies: [],
  };

  fetchCompaniesDataFromServer = () => {
    fetch('https://recruitment.hal.skygate.io/companies')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          companies: data,
        });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    console.log(`[component mounted]`);
    this.fetchCompaniesDataFromServer();
  }

  render() {
    return (
      <MainTemplate>
        <TableView>{this.state.companies}</TableView>
      </MainTemplate>
    );
  }
}

export default Root;
