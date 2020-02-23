import _ from 'lodash'
import React, { Component } from 'react'
import { Table, Button, Icon, Confirm } from 'semantic-ui-react'
import axios from 'axios';
import { EditProductModal, CreateProductModal } from "./Modal";

export default class DetailsTable extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        open: false,
        column: null,
        direction: null,
        products: this.props.products,
        selectedId: null
    }


    componentWillReceiveProps({ someProp }) {
        this.updateProducts();
    }

    handleSort = (clickedColumn) => () => {
        const { column, products, direction } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                products: _.sortBy(products, [clickedColumn]),
                direction: 'ascending',
            })

            return
        }

        this.setState({
            products: products.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    }

    handleDelete(id) {
        this.setState({
            selectedId: id,
            open: true


        })


    }

    //close delte confirmation modal
    confirmDelete = () => {
        this.setState({
            open: false
        })
        const URL = "api/Products/" + this.state.selectedId;
        console.log(URL);
        axios.delete(URL).then((res) => this.updateProducts())
    }

    handleEdit(id) {
        const URL = "api/Products/" + id;
        axios.put(URL).then((res) => this.updateProducts());
    }

    close = () => {
        this.setState({
            open: false
        })

    }



    updateProducts = () => {
        const getURL = "/api/Products"
        axios.get(getURL).then(result => {
            this.setState({ products: result.data });
        }
        );
    }

    render() {

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
                                sorted={column === 'name' ? direction : null}
                                onClick={this.handleSort('name')}
                            >
                                Name
            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'price' ? direction : null}
                                onClick={this.handleSort('price')}
                            >
                                Price
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
                        {_.map(this.state.products, ({ id, name, price }) => (
                            <Table.Row key={id}>
                                <Table.Cell>{name}</Table.Cell>
                                <Table.Cell>{price}</Table.Cell>
                                <Table.Cell>
                                    <EditProductModal id={id} name={name} price={price} onClose={() => this.updateProducts()} />
                                </Table.Cell>
                                <Table.Cell>
                                    <Button color='red' onClick={() => this.handleDelete(id)} ><i aria-hidden="true" className="delete icon"></i>Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        )
    }
}