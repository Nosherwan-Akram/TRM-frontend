import React, { Component } from "react";
import ReactTable from "react-table-6";
import { Redirect } from "react-router-dom";

class Files extends Component {
  state = {
    files: [],
    logout: false,
    gotoDigitize: false,
  };
  signout = () => {
    localStorage.clear();
    this.setState({ logout: true });
  };
  showDigitize = () => {
    this.setState({ gotoDigitize: true });
  };
  componentDidMount() {
    const url = "http://localhost:5000/api/showfiles";
    fetch(url, {
      headers: {
        Authorization: "JWT " + localStorage.token,
        // "Content-Type": "application/json",
        // Accept: "application/json",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((files) => {
        console.log(files);
        this.setState({ files: JSON.parse(files) });
      });
  }

  render() {
    const columns = [
      {
        Header: "Filename",
        accessor: "filename",
        width: 250,
        maxwidth: 250,
        minwidth: 250,
        textAlign: "center",
      },
      {
        Header: "Download Link",
        accessor: "path",
        Cell: (props) => <a href={props.value}>link</a>,
      },
    ];

    return (
      <div className="container">
        <button className="btn btn-success mx-1" onClick={this.showDigitize}>
          Table Digitizer
        </button>
        <button className="btn btn-success mx-1" onClick={() => this.signout()}>
          Signout
        </button>
        <ReactTable columns={columns} data={this.state.files}></ReactTable>
        {this.state.gotoDigitize && <Redirect to="/mainTemplate" />}
        {this.state.logout && <Redirect to="/login" />}
      </div>
    );
  }
}

export default Files;
