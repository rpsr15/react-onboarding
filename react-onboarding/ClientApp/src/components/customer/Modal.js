import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

const ModalModalExample = () => (
    <Modal trigger={<Button content='New Customer' primary />} centred={true}>
        <Modal.Header>Create Customer</Modal.Header>
        <Modal.Content>

        </Modal.Content>
    </Modal>
)

export default ModalModalExample