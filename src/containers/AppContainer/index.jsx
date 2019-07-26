import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Menu, Icon } from 'antd';

import './index.less';

const { Header, Sider, Content } = Layout;
const { Item } = Menu;

class AppContainer extends Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
    };
  }

  render() {
    const { children } = this.props;
    const { collapsed } = this.state;

    return (
      <Layout className="app-container">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']}>
            <Item key="1">
              <Link to="/">
                <Icon type="user" />
                home
              </Link>
            </Item>
            <Item key="2">
              <Link to="/detail">
                <Icon type="video-camera" />
                detail
              </Link>
            </Item>
            <Item key="3">
              <Link to="/abcdefg">404</Link>
            </Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className="app-header"><span /></Header>
          <Content className="app-body">{children}</Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(connect(state => ({ store: state }))(AppContainer));
