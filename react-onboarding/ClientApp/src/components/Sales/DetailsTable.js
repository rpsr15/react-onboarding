import _ from 'lodash'
import React, { Component } from 'react'
import { Table, Button, Icon, Confirm } from 'semantic-ui-react'
import axios from 'axios';
import { CreateSaleModal, EditSaleModal } from "./Modal";

export default class DetailsTable extends Component {
    constructor(props) {
        super(props);
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

    handleEdit(id) {
        const URL = "api/SaleData/" + id;
        axios.put(URL).then((res) => this.updateSales());
    }

    close = () => {
        this.setState({
            open: false
        })

    }



    updateSales = () => {
        const url = "/api/Sales"
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
                                sorted={column === 'customerId' ? direction : null}
                                onClick={this.handleSort('customerId')}
                            >
                                CustomerId
            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'price' ? direction : null}
                                onClick={this.handleSort('price')}
                            >
                                ProductId
            </Table.HeaderCell>
                            <Table.HeaderCell
                            >
                                StoreId
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
                        
                        {_.map(this.state.sales, ({ id, customerId, productId, storeId, dateSold }) =>

                            (
                                <Table.Row key={id}>
                                    <Table.Cell>{customerId}</Table.Cell>
                                    <Table.Cell>{productId}</Table.Cell>
                                    <Table.Cell>{storeId}</Table.Cell>
                                    <Table.Cell>{((new Date(dateSold)).getDate() + " " + months[(new Date(dateSold)).getMonth()] + "," + (new Date(dateSold)).getFullYear())}</Table.Cell>
                                    <Table.Cell>
                                        <EditSaleModal id={id} onClose={() => this.updateSales()} />
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