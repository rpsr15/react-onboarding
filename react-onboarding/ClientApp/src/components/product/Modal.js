import React, { Component } from 'react';
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react';
import axios from 'axios';


class CreateProductModal extends Component {

    state = { modalOpen: false, name: null, price: null }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })
    handleCreate = () => {
        if (this.state.name != '' || this.state.name != null) {
            axios.post('/api/Products', {
                name: this.state.name,
                price: parseFloat(this.state.price)
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
    handlePriceChange = (e) => {
        this.setState({ price: e.target.value })
    }


    render() {

        return (
            <Modal trigger={<Button onClick={this.handleOpen} content='New Product' primary />} centred={true}
                open={this.state.modalOpen}
                onClose={this.handleClose}
            >
                <Modal.Header>Create Product</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Name</label>
                            <input placeholder='Name' onChange={this.handleNameChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Price</label>
                            <input placeholder='Price' onChange={this.handlePriceChange} />
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


class EditProductModal extends Component {
    state = { modalOpen: false }
    constructor(props) {

        super(props)
        console.log(props)
        this.state.name = props.name
        this.state.price = props.price
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })
    handleEdit = () => {
        console.log("here", this.state.name, this.state.price)
        if (this.state.name != null && this.state.name != '') {
            //send put request
            const id = this.props.id
            axios.put('/api/Products/' + id, {
                id: id,
                name: this.state.name,
                price: parseFloat(this.state.price)
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
    handlePriceChange = (e) => {
        this.setState({ price: e.target.value })
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
                            <input placeholder={this.props.name} defaultValue={this.props.name} onChange={this.handleNameChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Price</label>
                            <input defaultValue={this.props.price} onChange={this.handlePriceChange} />
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

export { CreateProductModal, EditProductModal }