import React, { Component } from 'react';
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
        const getProductURL = "/api/Products"
        axios.get(getProductURL).then(result => {
            console.log("got products", result.data);
            this.setState({ loading: false, products: result.data });
        }
        );
    }
    handleDelete() {


    }
    onClose = () => {
        const getProductURL = "/api/Products"
        axios.get(getProductURL).then(result => {
            this.setState({ loading: false, products: result.data });
        }
        );
    }
    render() {
        const columnNames = ['Name', 'Price']
        return (
            <div>


                <CreateProductModal onClose={this.onClose} />


                {this.state.loading ? "loading..." : <DetailsTable products={this.state.products} />}
            </div>
        );
    }

}