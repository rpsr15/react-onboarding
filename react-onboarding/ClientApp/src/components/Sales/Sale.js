import React, { Component } from 'react';
import { Button, Confirm } from 'semantic-ui-react'
import DetailsTable from './DetailsTable';
import axios from 'axios';
import { CreateSaleModal } from "./Modal";



export class Sale extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            sales: [],
            loading: true
        }
    }


    componentDidMount() {
        const url = "api/Sales"
        axios.get(url).then(result => {
            this.setState({ loading: false, sales: result.data });
             
                axios.get('/api/Products').then(result => {
                    console.log("products", result.data);
                    result.data.map(product => {
                        product['key'] = product.id
                        product['text'] = product.name
                        product['value'] = product.id
                    });

                    this.setState({ products: result.data });
                    axios.get('/api/Customers').then(result => {
                        result.data.map(customer => {
                            customer['key'] = customer.id
                            customer['text'] = customer.name
                            customer['value'] = customer.id
                        });
                    this.setState({ customers: result.data });
                        axios.get('/api/Store').then(result => {
                            result.data.map(store => {
                                store['key'] = store.id
                                store['text'] = store.name
                                store['value'] = store.id
                            });
                        this.setState({ stores: result.data });
                    });
                });

            });
        }
        );

        
    }
    handleDelete() {


    }
    onClose = () => {
        const url = "api/Sales"
        axios.get(url).then(result => {
            this.setState({ loading: false, sales: result.data });
        }
        );
    }
    render() {

        return (
            <div>


                <CreateSaleModal onClose={this.onClose} customers={this.state.customers} products={this.state.products} stores={this.state.stores} />


                {this.state.loading ? "loading..." : <DetailsTable sales={this.state.sales} />}
            </div>
        );
    }

}