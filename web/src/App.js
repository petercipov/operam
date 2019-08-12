import React, { Component } from 'react';
import './App.css';
import Imagenet from './Imagenet';
import { Card, Layout, Spin } from 'antd';
const { Content } = Layout;

class App extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      loading: false
    }
    this.lookup = this.lookup.bind(this)
  }

  lookup(search) {
    this.setState({
      data: [],
      loading: true
    })
    return fetch(search ? `/tree?search=${search}` : '/tree', {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (response) => {
      const data = await response.json()
      this.setState({
        data,
        loading: false
      })
      return data
    })
  }

  render() {
    return (
      <Layout>
        <Content>
            <Card title='Imagenet'>
              <Spin spinning={this.state.loading}>
                <Imagenet data={this.state.data} search={this.lookup}  />
              </Spin>
            </Card>
        </Content>
      </Layout>
      
    );
  }

  componentDidMount(){
    this.lookup()
  }
}

export default App;
