import _ from 'lodash'
import React, { Component } from 'react'
import { Table, Button, Icon } from 'semantic-ui-react'
import axios from 'axios';
import { CreateUserModal, EditUserModal } from "./customer/Modal";

export default class DetailsTable extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        column: null,
        direction: null,
        customers: this.props.customers
    }


    componentWillReceiveProps({ someProp }) {
        console.log("receie prop");
        this.updateCustomers();
    }

    handleSort = (clickedColumn) => () => {
        const { column, customers, direction } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                customers: _.sortBy(customers, [clickedColumn]),
                direction: 'ascending',
            })

            return
        }

        this.setState({
            customers: customers.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    }

    handleDelete(id) {
        const URL = "api/Customers/" + id;
        axios.delete(URL).then((res) => this.updateCustomers());
    }


    handleEdit(id) {
        const URL = "api/Customers/" + id;
        axios.put(URL).then((res) => this.updateCustomers());
    }



    updateCustomers = () => {
        const getCustomersURL = "/api/Customers"
        axios.get(getCustomersURL).then(result => {
            this.setState({ customers: result.data });
        }
        );
    }

    render() {
        const { column, direction } = this.state
        return (
            <Table sortable celled striped fixed>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell
                            sorted={column === 'name' ? direction : null}
                            onClick={this.handleSort('name')}
                        >
                            Name
            </Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={column === 'address' ? direction : null}
                            onClick={this.handleSort('address')}
                        >
                            Address
            </Table.HeaderCell>
                        <Table.HeaderCell
                        >
                            Action
            </Table.HeaderCell>
                        <Table.HeaderCell
                        >
                            Action
            </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {_.map(this.state.customers, ({ id, name, address }) => (
                        <Table.Row key={id}>
                            <Table.Cell>{name}</Table.Cell>
                            <Table.Cell>{address}</Table.Cell>
                            <Table.Cell>
                                <EditUserModal id={id} onClose={() => this.updateCustomers()} />
                            </Table.Cell>
                            <Table.Cell>
                                <Button color='red' onClick={() => this.handleDelete(id)} ><i aria-hidden="true" className="delete icon"></i>Delete</Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        )
    }
}