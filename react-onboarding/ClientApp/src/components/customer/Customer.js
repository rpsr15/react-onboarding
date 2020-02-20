import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import DetailsTable from '../DetailsTable';
import axios from 'axios';
import ModalBasicExample from "./Modal";



export class Customer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open:false,
            customers: [],
            loading: true
        }
    }


    componentDidMount(){
        const getCustomersURL = "/api/Customers"
        axios.get(getCustomersURL).then(result => {
            this.setState({ loading: false, customers: result.data });
        }
            );
    }
    handleDelete() {
        console.log(`mil gay i`)
        this.setState({open:true})

    }
    render() {
        const columnNames = ['Name', 'Address']
        return (
            <div>
                <ModalBasicExample  />

                
                {this.state.loading ? "loading..." : <DetailsTable customers={this.state.customers} />}
            </div>
            );
    }

}