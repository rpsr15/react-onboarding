import React, { Component } from 'react';
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react';
import axios from 'axios';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';


class CreateSaleModal extends Component {
    state = { modalOpen: false }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })
    handleCreate = () => {
        if (this.state.productId != '' || this.state.productId != null) {
            axios.post('/api/SaleData', {
                productId: this.state.produtId,
                customerId: this.state.customerId,
                storeId: this.state.storeId,
                dateSold: (new Date()).toLocaleDateString()

            })
                .then((response) => {
                    this.closeModal()
                })
        }

    }

    closeModal = () => {
        this.props.onClose();
        this.setState({ modalOpen: false })
    }

    handleNameChange = (e) => {
        this.setState({ name: e.target.value })
    }
    handleAddressChange = (e) => {
        this.setState({ address: e.target.value })
    }

    onDateChange = (e) => {
        console.log(e.target.value);
        this.setState({
            dateSold: e.target.value
        })
    }


    render() {
        const styleObj = {
            height: "200rem !important"
        }

        return (
            <Modal style={styleObj} trigger={<Button onClick={this.handleOpen} content='New Sale' primary />} centred={true}
                open={this.state.modalOpen}
                onClose={this.handleClose}
            >
                <Modal.Header>Create Customer</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Date Sold </label>
                            <SemanticDatepicker onChange={this.onDateChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>ProductId</label>
                            <input placeholder='Customer' onChange={this.handleNameChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>CustomerId</label>
                            <input placeholder='Product' onChange={this.handleAddressChange} />
                        </Form.Field>

                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red' onClick={this.handleClose}>
                        <Icon name='remove' /> Cancel
      </Button>
                    <Button color='green' onClick={this.handleCreate}>
                        <Icon name='checkmark' /> Create
      </Button>
                </Modal.Actions>
            </Modal >);


    }
}


class EditSaleModal extends Component {
    state = { modalOpen: false, name: null, address: null }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })
    handleEdit = () => {
        if (this.state.name != null && this.state.name != '') {
            //send put request
            const id = this.props.id
            axios.put('/api/Customers/' + id, {
                id: id,
                name: this.state.name,
                address: this.state.address
            })
                .then((response) => {
                    console.log(response);
                    this.closeModal()
                })
        }

    }

    closeModal = () => {
        this.props.onClose();
        this.setState({ modalOpen: false })
    }

    handleNameChange = (e) => {
        this.setState({ name: e.target.value })
    }
    handleAddressChange = (e) => {
        this.setState({ address: e.target.value })
    }


    render() {

        return (
            <Modal trigger={<Button color='yellow' onClick={this.handleOpen}> <i aria-hidden="true" className="edit icon"></i>Edit</Button>} centred={true}
                open={this.state.modalOpen}
                onClose={this.handleClose}
            >
                <Modal.Header>Edit Customer</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Name</label>
                            <input placeholder='Name' onChange={this.handleNameChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Address</label>
                            <input placeholder='Address' onChange={this.handleAddressChange} />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red' onClick={this.handleClose}>
                        <Icon name='remove' /> Cancel
      </Button>
                    <Button color='green' onClick={this.handleEdit}>
                        <Icon name='checkmark' /> Edit
      </Button>
                </Modal.Actions>
            </Modal >);


    }
}

export { CreateSaleModal, EditSaleModal }