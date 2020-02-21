﻿import React, { Component } from 'react';
import { Button, Confirm } from 'semantic-ui-react'
import DetailsTable from './DetailsTable';
import axios from 'axios';
import { CreateProductModal } from "./Modal";



export class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            products: [],
            loading: true
        }
    }


    componentDidMount() {
        const getCustomersURL = "/api/Customers"
        axios.get(getCustomersURL).then(result => {
            this.setState({ loading: false, customers: result.data });
        }
        );
    }
    handleDelete() {


    }
    onClose = () => {
        //Reload data in details
        console.log("on close");
        const getCustomersURL = "/api/Customers"
        axios.get(getCustomersURL).then(result => {
            this.setState({ loading: false, customers: result.data });
        }
        );
    }
    render() {
        const columnNames = ['Name', 'Price']
        return (
            <div>


                <CreateProductModal onClose={this.onClose} />


                {this.state.loading ? "loading..." : <DetailsTable customers={this.state.customers} />}
            </div>
        );
    }

}