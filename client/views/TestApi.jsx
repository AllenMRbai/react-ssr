import React, { Component } from "react";
import axios from "../lib/axios";
import accessToken from "../config/accessToken";

export default class TestApi extends Component {
  getTopics = () => {
    return axios.get("/api/topics", {
      params: {
        page: 1,
        tab: "ask",
        limit: "2"
      }
    });
  };

  login = () => {
    return axios
      .post("/api/user/login", {
        accessToken
      })
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(err => {
        console.log(err);
      });
  };

  getMessageCount = () => {
    return axios
      .get("/api/message/count")
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  markAll = () => {
    return axios
      .post("/api/message/mark_all")
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  markError = () => {
    return axios
      .post("/api/message/mark_allsdfdsf")
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  promiseAll = () => {
    return Promise.all([this.login(), this.getTopics()]).then(resArr => {
      console.log("这是promise all");
      console.log(resArr);
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
        <button onClick={this.markError} type="button">
          this will make a reques error
        </button>
        <button onClick={this.promiseAll} type="button">
          promise all
        </button>
      </div>
    );
  }
}
