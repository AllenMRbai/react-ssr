import React, { Component } from "react";
import axios from "axios";
import accessToken from "../config/accessToken";

export default class TestApi extends Component {
  getTopics = () => {
    axios.get("/api/topics", {
      params: {
        page: 1,
        tab: "ask",
        limit: "2"
      }
    });
  };

  login = () => {
    axios
      .post("/api/user/login", {
        accessToken
      })
      .then(res => {
        console.log(res); // eslint-disable-line
      })
      .catch(err => {
        console.log(err); // eslint-disable-line
      });
  };

  getMessageCount = () => {
    axios
      .get("/api/message/count")
      .then(res => {
        console.log(res); // eslint-disable-line
      })
      .catch(err => {
        console.log(err); // eslint-disable-line
      });
  };

  markAll = () => {
    axios
      .post("/api/message/mark_all")
      .then(res => {
        console.log(res); // eslint-disable-line
      })
      .catch(err => {
        console.log(err); // eslint-disable-line
      });
  };

  render() {
    return (
      <div>
        <button onClick={this.getTopics} type="button">
          topics
        </button>
        <button onClick={this.login} type="button">
          login
        </button>
        <button onClick={this.getMessageCount} type="button">
          message/count
        </button>
        <button onClick={this.markAll} type="button">
          message/mark_all
        </button>
      </div>
    );
  }
}
