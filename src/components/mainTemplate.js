import React, { Component } from "react";
import ReactTable from "react-table-6";
import { Redirect } from "react-router-dom";
class MainTemplate extends Component {
  state = {
    posts: [],
    dam: [],
    imgFile: null,
    logout: false,
  };
  componentDidMount() {}
  fileHandler = (event) => {
    this.setState({ imgFile: event.target.files[0] });
  };
  fileUpload = () => {
    const fd = new FormData();
    fd.append("Image", this.state.imgFile, "test.jpg");
    const url = "http://localhost:5000/uploads";
    fetch(url, {
      method: "POST",
      body: fd,
    })
      .then((response) => response.json())
      .then((re) => {
        console.log(re);
      });
  };
  signout = () => {
    localStorage.clear();
    this.setState({ logout: true });
  };
  fileName = (event) => {
    this.setState({ fileName: event.target.value });
  };
  fileDigitize = () => {
    const url = "http://localhost:5000/tr";
    fetch(url, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((dam) => {
        console.log(dam);
        this.setState({ dam: JSON.parse(dam) });
      });
  };

  render() {
    const columns = [
      {
        Header: "0",
        accessor: "0",
      },
      {
        Header: "1",
        accessor: "1",
      },
      {
        Header: "2",
        accessor: "2",
      },
      {
        Header: "3",
        accessor: "3",
      },
      {
        Header: "4",
        accessor: "4",
      },
      {
        Header: "5",
        accessor: "5",
      },
      {
        Header: "6",
        accessor: "6",
      },
    ];
    return (
      <div className="container">
        <input type="file" onChange={this.fileHandler}></input>
        <button onClick={this.fileUpload} className="btn btn-success mx-1">
          Upload
        </button>
        <input
          type="text"
          placeholder="enter output file name"
          onChange={this.fileName}
        ></input>
        <button onClick={this.fileDigitize} className="btn btn-success mx-1">
          Digitize
        </button>
        <button className="btn btn-success" onClick={() => this.signout()}>
          Signout
        </button>
        <ReactTable columns={columns} data={this.state.dam}></ReactTable>
        {this.state.logout && <Redirect to="/login" />}
      </div>
    );
  }
}

export default MainTemplate;
