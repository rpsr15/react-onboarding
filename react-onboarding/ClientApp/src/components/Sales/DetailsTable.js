import _ from 'lodash'
import React, { Component } from 'react'
import { Table, Button, Icon, Confirm } from 'semantic-ui-react'
import axios from 'axios';
import { CreateSaleModal, EditSaleModal } from "./Modal";

export default class DetailsTable extends Component {
    constructor(props) {
        super(props);
        console.log("here ravi",this.props.sales);
        this.state.sales = this.props.sales

    }


    state = {
        open: false,
        column: null,
        direction: null,
        sales: this.props.sale,
        selectedId: null
    }


    componentWillReceiveProps({ someProp }) {
        console.log("receie prop");
        this.updateSales();
    }

    handleSort = (clickedColumn) => () => {
        const { column, sales, direction } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                sales: _.sortBy(sales, [clickedColumn]),
                direction: 'ascending',
            })

            return
        }

        this.setState({
            sales: sales.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    }

    handleDelete(id) {
        console.log("handling delete", id)
        this.setState({
            selectedId: id,
            open: true


        })


    }


    confirmDelete = () => {
        this.setState({
            open: false
        })
        const URL = "api/Sales/" + this.state.selectedId;
        console.log(URL);
        axios.delete(URL).then((res) => this.updateSales())
    }

    //handleEdit(id) {
    //    const URL = "api/SaleData/" + id;
    //    axios.put(URL).then((res) => this.updateSales());
    //}

    close = () => {
        this.setState({
            open: false
        })

    }



    updateSales = () => {
        const url = "/api/Sales/SaleData"
        axios.get(url).then(result => {
            this.setState({ sales: result.data });
        }
        );
    }

    render() {
        const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

        const { column, direction } = this.state
        return (
            <div>
                <Confirm className="confirmModal"
                    open={this.state.open}
                    onCancel={this.close}
                    onConfirm={this.confirmDelete}
                />
                <Table sortable celled striped fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell
                                sorted={column === 'customer' ? direction : null}
                                onClick={this.handleSort('customer')}
                            >
                                Customer
            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'product' ? direction : null}
                                onClick={this.handleSort('product')}
                            >
                                Product
            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'store' ? direction : null}
                                onClick={this.handleSort('store')}
                            >
                                Store
            </Table.HeaderCell>
                            <Table.HeaderCell
                            >
                                DateSold
            </Table.HeaderCell>
                            <Table.HeaderCell
                            >
                                Actions
            </Table.HeaderCell>
                            <Table.HeaderCell
                            >
                                Actions
            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        
                        {_.map(this.state.sales, ({ id, customer, customerId, product, productId, store, storeId, dateSold }) =>

                            (
                                <Table.Row key={id}>
                                    <Table.Cell>{customer}</Table.Cell>
                                    <Table.Cell>{product}</Table.Cell>
                                    <Table.Cell>{store}</Table.Cell>
                                    <Table.Cell>{((new Date(dateSold)).getDate() + " " + months[(new Date(dateSold)).getMonth()] + "," + (new Date(dateSold)).getFullYear())}</Table.Cell>
                                    <Table.Cell>
                                        <EditSaleModal id={id} customer={customer} customerId={customerId} product={product} productId={productId} store={store} storeId={storeId} dateSold={dateSold} customers={this.props.customers} stores={this.props.stores} products={this.props.products} onClose={() => this.updateSales()} />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button color='red' onClick={() => this.handleDelete(id)} ><i aria-hidden="true" className="delete icon"></i>Delete</Button>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        )}
                    </Table.Body>
                </Table>
            </div>
        )
    }
}