import React, { Component } from 'react';
import { Button, Confirm } from 'semantic-ui-react'

export default class ErrorModal extends Component {

    state = { open: false }
    close = () => this.setState({ open: false })
    render() {
        return (
            <Modal size={'mini'} open={open} onClose={this.close}>
                <Modal.Header>Cannot delete. Please check associated sale.</Modal.Header>
                <Modal.Actions>
                    <Button
                        positive
                        icon='checkmark'
                        labelPosition='right'
                        content='Ok'
                    />
                </Modal.Actions>
            </Modal>
            );
    }
}