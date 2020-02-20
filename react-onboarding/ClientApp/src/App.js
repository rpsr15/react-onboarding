import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Customer } from './components/customer/Customer';
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Customer} />
        <Route path='/customers' component={Customer} />
      </Layout>
    );
  }
}
