import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";
import axios from "../../lib/axios";

import AppState from "../../store/app.store";

function model() {
  return axios.get("/api/topics", {
    params: {
      page: 1,
      tab: "job",
      limit: 10
    }
  });
}

@inject("appState")
@observer
class TopicList extends Component {
  static initialData() {
    return model();
  }

  constructor(props) {
    super(props);
    this.state = {
      topics: []
    };
    /* eslint-disable no-param-reassign */
    if (props.staticContext && props.staticContext.datas) {
      const { match } = this.props;
      const res = props.staticContext.datas[match.path];

      if (res instanceof Error) {
        return console.error(res);
      }

      this.state.topics = res.data.data;
      props.staticContext.initialState[match.path] = {
        topics: res.data.data
      };
    }
    /* eslint-enable no-param-reassign */
  }

  componentDidMount() {
    const { match } = this.props;

    /* eslint-disable no-underscore-dangle */
    if (window.__INITIAL_STATE__ && window.__INITIAL_STATE__[match.path]) {
      this.setState({
        topics: [...window.__INITIAL_STATE__[match.path].topics]
      });
      delete window.__INITIAL_STATE__[match.path];
    } else {
      model().then(res => {
        if (res.data.success) {
          this.setState({ topics: [...res.data.data] });
        }
      });
    }
    /* eslint-enable no-underscore-dangle */
  }

  changeName = evt => {
    const { appState } = this.props;
    appState.changeName(evt.target.value);
  };

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
