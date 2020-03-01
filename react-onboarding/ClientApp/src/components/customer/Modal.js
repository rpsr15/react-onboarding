import React, { Component } from 'react';
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react';
import axios from 'axios';


class CreateUserModal extends Component {
    state = { modalOpen: false, name: null, address: null }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })
    handleCreate = () => {
        if (this.state.name != '' || this.state.name != null) {
            axios.post('/api/Customers', {
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
            <Modal style={{ position: 'relative', height: '26rem' }} trigger={<Button onClick={this.handleOpen} content='New Customer' primary />} centred={true}
                open={this.state.modalOpen}
                onClose={this.handleClose}
            >
                <Modal.Header>Create Customer</Modal.Header>
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


class EditUserModal extends Component {
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

export { CreateUserModal, EditUserModal }