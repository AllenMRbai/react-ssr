import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";
import axios from "axios";

import AppState from "../../store/app.store";

@inject("appState")
@observer
class TopicList extends Component {
  state = {
    topics: []
  };

  componentDidMount() {
    this.fetchData();
  }

  changeName = evt => {
    const { appState } = this.props;
    appState.changeName(evt.target.value);
  };

  fetchData = () => {
    return axios
      .get("/api/topics", {
        params: {
          page: 1,
          tab: "job",
          limit: 10
        }
      })
      .then(({ data }) => {
        if (data.success) {
          this.setState({ topics: [...data.data] });
        }
      });
  };

  asyncBootstrap() {
    return new Promise(resolve => {
      setTimeout(() => {
        const { appState } = this.props;
        appState.add();
        console.log();
        resolve(true);
      }, 1000);
    });
  }

  render() {
    const { appState } = this.props;
    const { msg } = appState;
    const { topics } = this.state;

    return (
      <div>
        <input type="text" onChange={this.changeName} />
        <h2>{msg}</h2>
        <ul>
          {topics.map(item => {
            return <li key={item.id}>{item.title}</li>;
          })}
        </ul>
      </div>
    );
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState)
};

export default TopicList;
