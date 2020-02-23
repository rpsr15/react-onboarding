import React, { Component } from 'react';
import { Button, Icon, Modal, Form } from 'semantic-ui-react';
import axios from 'axios';


class CreateStoreModal extends Component {
    state = { modalOpen: false, name: null, address: null }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })
    handleCreate = () => {
        if (this.state.name != '' || this.state.name != null) {
            axios.post('/api/Store', {
                name: this.state.name,
                address: this.state.address
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


    render() {

        return (
            <Modal trigger={<Button onClick={this.handleOpen} content='New Store' primary />} centred={true}
                open={this.state.modalOpen}
                onClose={this.handleClose}
            >
                <Modal.Header>Create Store</Modal.Header>
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
                    <Button color='green' onClick={this.handleCreate}>
                        <Icon name='checkmark' /> Create
      </Button>
                </Modal.Actions>
            </Modal >);


    }
}


class EditStoreModal extends Component {
    state = { modalOpen: false }
    constructor(props) {

        super(props)
        console.log(props)
        this.state.name = props.name
        this.state.address = props.address
    }


    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })
    handleEdit = () => {
        if (this.state.name != null && this.state.name != '') {
            //send put request
            const id = this.props.id
            axios.put('/api/Store/' + id, {
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
                <Modal.Header>Edit Store</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Name</label>
                            <input defaultValue={this.state.name} onChange={this.handleNameChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Address</label>
                            <input defaultValue={this.state.address} onChange={this.handleAddressChange} />
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

export { CreateStoreModal, EditStoreModal }