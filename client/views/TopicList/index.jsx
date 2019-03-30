import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";

import { AppState } from "../../store/app.store";

@inject("appState")
@observer
class TopicList extends Component {
  changeName = evt => {
    const { appState } = this.props;
    appState.changeName(evt.target.value);
  };

  render() {
    const { appState } = this.props;
    const { msg } = appState;

    return (
      <div>
        <input type="text" onChange={this.changeName} />
        <h2>{msg}</h2>
      </div>
    );
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState)
};

export default TopicList;
