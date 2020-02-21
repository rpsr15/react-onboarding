import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Customer } from './components/customer/Customer';
import { Product } from './components/product/Product';
import { Sale } from './components/Sales/Sale';
import { Store } from './components/Store/Store';
import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Customer} />
                <Route path='/customers' component={Customer} />
                <Route path='/products' component={Product} />
                <Route path='/stores' component={Store} />
                <Route path='/sales' component={Sale} />
            </Layout>
        );
    }
}
