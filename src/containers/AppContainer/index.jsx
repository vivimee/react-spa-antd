import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout } from 'antd';

import './index.less';

class AppContainer extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    console.log(this.constructor.name, this.props);
  }

  render() {
    const { Header } = Layout;
    const { children } = this.props;
    return (
      <Layout className="app-container">
        <Header className="app-header">
          <Link to="/">home</Link>
          <Link to="/detail">detail</Link>
          <Link to="/abcdefg">404</Link>
        </Header>
        <Layout className="app-body">{children}</Layout>
      </Layout>
    );
  }
}

export default withRouter(connect(state => ({ store: state }))(AppContainer));
