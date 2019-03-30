import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import { AppState } from '../../store/app.store';

@inject('appState')
@observer
class TopicList extends Component {
  render() {
    const { appState } = this.props;
    const { name, count } = appState;

    return (
      <div>
        <h2>{`姓名是：${name},购买商品数量：${count}`}</h2>
      </div>
    );
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState).isRequired,
};

export default TopicList;
