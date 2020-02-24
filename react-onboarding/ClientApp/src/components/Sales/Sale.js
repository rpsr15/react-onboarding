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
        const url = "/api/SaleData"
        axios.get(url).then(result => {
            console.log(result.data);
            this.setState({ loading: false, sales: result.data });
        }
        );
    }
    handleDelete() {


    }
    onClose = () => {
        const url = "/api/SaleData"
        axios.get(url).then(result => {
            this.setState({ loading: false, sales: result.data });
        }
        );
    }
    render() {

        return (
            <div>


                <CreateSaleModal onClose={this.onClose} />


                {this.state.loading ? "loading..." : <DetailsTable sales={this.state.sales} />}
            </div>
        );
    }

}