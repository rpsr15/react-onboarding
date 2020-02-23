import React, { Component } from 'react';
import { Button, Confirm } from 'semantic-ui-react'
import DetailsTable from './DetailsTable';
import axios from 'axios';
import { CreateStoreModal } from "./Modal";



export class Store extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            stores: [],
            loading: true
        }
    }


    componentDidMount() {
        const url = "/api/Store"
        axios.get(url).then(result => {
            this.setState({ loading: false, stores: result.data });
        }
        );
    }
    handleDelete() {


    }
    onClose = () => {
        //Reload data in details
        console.log("on close");
        const url = "/api/Customers"
        axios.get(url).then(result => {
            this.setState({ loading: false, stores: result.data });
        }
        );
    }
    render() {
        const columnNames = ['Name', 'Address']
        return (
            <div>


                <CreateStoreModal onClose={this.onClose} />


                {this.state.loading ? "loading..." : <DetailsTable stores={this.state.stores} />}
            </div>
        );
    }

}