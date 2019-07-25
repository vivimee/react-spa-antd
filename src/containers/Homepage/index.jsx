import React from 'react';
import { Button, Layout } from 'antd';
import HeadSrc from '../../assets/head.jpeg';

export default class Homepage extends React.Component {
  render() {
    // console.log(this.constructor.name, this.props);
    this.a = 1;
    return (
      <Layout>
        <h4>homepage</h4>
        <img alt=" " src={HeadSrc} style={{ width: '100px' }} />
        <div>
          <Button>按钮</Button>
          <br />
          <br />
          <Button type="primary" icon="close-circle">按钮</Button>
        </div>
      </Layout>
    );
  }
}
