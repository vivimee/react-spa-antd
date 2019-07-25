import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoadingBar, { showLoading, hideLoading } from 'react-redux-loading-bar';

import './index.less';

class Loading extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(showLoading());
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(hideLoading());
  }

  render() {
    return (
      <div className="loading-bar-box">
        <LoadingBar />
      </div>
    );
  }
}

export default connect(state => ({ store: state }))(Loading);
