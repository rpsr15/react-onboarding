import _ from 'lodash'
import React, { Component } from 'react'
import { Table, Button, Icon, Confirm , Modal} from 'semantic-ui-react'
import axios from 'axios';
import { EditStoreModal, CreateStoreModal } from "./Modal";

export default class DetailsTable extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        open: false,
        column: null,
        warningOpen: false,
        direction: null,
        stores: this.props.stores,
        selectedId: null
    }


    componentWillReceiveProps({ someProp }) {
        console.log("receie prop");
        this.updateStores();
    }

    handleSort = (clickedColumn) => () => {
        const { column, stores, direction } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                stores: _.sortBy(stores, [clickedColumn]),
                direction: 'ascending',
            })

            return
        }

        this.setState({
            stores: stores.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    }

    handleDelete(id) {
        //check if can be delted
        console.log("handling delete", id)
        axios.get("/api/Customers/canDelete/" + id).then(
            res => {
                console.log(res.data);

                if (res.data === true) {


                    this.setState({
                        selectedId: id,
                        open: true


                    })

                }
                else {

                    this.setState({
                        warningOpen: true


                    })
                }
            }
        );


    }

    closeWarning = () => {
        console.log("tryin to close warning");
        this.setState({
            warningOpen: false
        })

    }

    //close delte confirmation modal
    confirmDelete = () => {
        this.setState({
            open: false
        })
        const URL = "api/Store/" + this.state.selectedId;
        console.log(URL);
        axios.delete(URL).then((res) => this.updateStores())
    }

    handleEdit(id) {
        const URL = "api/Store/" + id;
        axios.put(URL).then((res) => this.updateStores());
    }

    close = () => {
        this.setState({
            open: false
        })

    }



    updateStores = () => {
        const url = "/api/Store"
        axios.get(url).then(result => {
            this.setState({ stores: result.data });
        }
        );
    }

    render() {

        const { column, direction } = this.state
        return (
            <div>
                <Modal style={{ height: '15rem' }} size={'mini'} open={this.state.warningOpen} onClose={this.closeWarning}>
                    <Modal.Header>Cannot Delete!</Modal.Header>
                    <Modal.Content>
                        <p>Please check associated sales.</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            icon='checkmark'
                            labelPosition='right'
                            content='Ok'
                            onClick={this.closeWarning}
                        />
                    </Modal.Actions>
                </Modal>
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
                                sorted={column === 'address' ? direction : null}
                                onClick={this.handleSort('address')}
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
                        {_.map(this.state.stores, ({ id, name, address }) => (
                            <Table.Row key={id}>
                                <Table.Cell>{name}</Table.Cell>
                                <Table.Cell>{address}</Table.Cell>
                                <Table.Cell>
                                    <EditStoreModal id={id} name={name} address={address} onClose={() => this.updateStores()} />
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