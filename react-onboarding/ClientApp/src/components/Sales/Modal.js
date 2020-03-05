import React, { Component } from 'react';
import { Button, Header, Icon, Modal, Form, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';

class CreateSaleModal extends Component {

    constructor(props) {
        super(props);
        const date = new Date();
       // const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours());
        this.state.defaultDate = date;
        this.state.selectedDate = date;
    }
    state = { modalOpen: false, customers: [], products: [], stores: [] }

     formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false, selectedCustomer: null, selectedDate: null, selectedProduct: null, selectedStore: null })
    handleCreate = () => {

        if (this.state.selectedCustomer && this.state.selectedProduct && this.state.selectedStore && this.state.selectedDate) {
            
            axios.post('/api/Sales', {
                customerId: this.state.selectedCustomer,
                productId: this.state.selectedProduct,
                storeId: this.state.selectedStore,
                dateSold: this.formatDate(this.state.selectedDate)
                //convert to yyyy-mm-dd

            }).then((response) => {
                console.log(response);
                    this.closeModal()
                })
        }

    }

    closeModal = () => {
        this.props.onClose();
        this.setState({ modalOpen: false })
    }

    handleCustomerChange = (e, data) => {
        console.log("customer chage", data.value);
        this.setState({ selectedCustomer: data.value});
    }

    handleProductChange = (e, data) => {
        console.log("product change", data.value);
        this.setState({ selectedProduct: data.value });
    }
    handleStoresChange = (e, data) => {
        console.log("store change", data.value);
        this.setState({ selectedStore: data.value });
    }

    //onDateChange = (event, data) => {
    //    const date = new Date(data.value)
    //    const dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
    //        .toISOString()
    //        .split("T")[0];
    //    this.setState({ selectedDate: dateString });
    //}

    onDateChange = (event, data) => {
        const date = new Date(data.value)
        console.log("abhi chutiya",date);
        this.setState({ selectedDate: date });
    }


    render() {
        const styleObj = {
            height: "200rem !important"
        }

        return (
            <Modal style={{ position: 'relative', height: '35rem' }} trigger={<Button onClick={this.handleOpen} content='New Sale' primary />} centred={true}
                open={this.state.modalOpen}
                onClose={this.handleClose}
            >
                <Modal.Header>Create Sale</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Date Sold </label>
                            <SemanticDatepicker clearable={false} value={this.state.defaultDate} onChange={this.onDateChange} format={"MM/DD/YYYY"} />
                        </Form.Field>
                        <Form.Field>
                            <label>Customer</label>
                            <Dropdown
                                placeholder='Customer'
                                fluid
                                search
                                selection
                                options={this.props.customers}
                                onChange={this.handleCustomerChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Product</label>
                            <Dropdown
                                placeholder='Product'
                                fluid
                                search
                                selection
                                options={this.props.products}
                                onChange={this.handleProductChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Store</label>
                            <Dropdown
                                placeholder='Store'
                                fluid
                                search
                                selection
                                options={this.props.stores}
                                onChange={this.handleStoresChange}
                            />
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
    state = { modalOpen: false, customers: [], products: [], stores: [] }

    componentDidMount() {
        
    }

    constructor(props) {
        super(props);
        const date = new Date(this.props.dateSold);
        const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours());
        console.log(date.toLocaleDateString());
        console.log(newDate.toLocaleDateString());
        
        this.state.id = this.props.id;
        this.state.selectedCustomer = this.props.customerId;
        this.state.selectedProduct = this.props.productId;
        this.state.selectedStore = this.props.storeId;
        this.state.selectedDate = date;
        this.state.dateSold = date;
        this.state.customerName = this.props.customer;
        this.state.productName = this.props.product;
        this.state.storeName = this.props.store;
        this.state.customerId = this.props.customerId;
        this.state.productId = this.props.productId;
        this.state.storeId = this.props.storeId;
    }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false, selectedCustomer: this.state.customerId, selectedDate: this.state.dateSold, selectedProduct: this.state.productId, selectedStore: this.state.storeId })
    handleCreate = () => {


       

        console.log(this.state.selectedDate.toLocaleDateString());
        axios.put('/api/Sales/'+this.state.id, {
            id: this.state.id,
            customerId: this.state.selectedCustomer,
                productId: this.state.selectedProduct,
            storeId: this.state.selectedStore,
            dateSold: this.formatDate(this.state.selectedDate)

            }).then((response) => {
                console.log(response);
                this.closeModal();
            })
        

    }

    closeModal = () => {
        this.props.onClose();
        this.setState({ modalOpen: false })
    }

    handleCustomerChange = (e, data) => {
        console.log("customer chage", data.value);
        this.setState({ selectedCustomer: data.value });
    }

    handleProductChange = (e, data) => {
        console.log("product change", data.value);
        this.setState({ selectedProduct: data.value });
    }
    handleStoresChange = (e, data) => {
        console.log("store change", data.value);
        this.setState({ selectedStore: data.value });
    }

    onDateChange = (event, data) => {
        const date = new Date(data.value)
        this.setState({ selectedDate: date });
    }


    render() {
        const styleObj = {
            height: "200rem !important"
        }

        return (
            <Modal style={{ position: 'relative', height: '35rem' }} trigger={<Button color='yellow' onClick={this.handleOpen}> <i aria-hidden="true" className="edit icon"></i>Edit</Button>} centred={true}
                open={this.state.modalOpen}
                onClose={this.handleClose}
            >
                <Modal.Header>Edit_ Sale</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Date Sold </label>
                            <SemanticDatepicker clearable={false} value={this.state.dateSold} onChange={this.onDateChange} format={"MM/DD/YYYY"} />

                        </Form.Field>
                        <Form.Field>
                            <label>Customer</label>
                            <Dropdown
                                placeholder={this.state.customerName}
                                fluid
                                search
                                selection
                                options={this.props.customers}
                                onChange={this.handleCustomerChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Product</label>
                            <Dropdown
                                placeholder={this.state.productName}
                                fluid
                                search
                                selection
                                options={this.props.products}
                                onChange={this.handleProductChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Store</label>
                            <Dropdown
                                placeholder={this.state.storeName}
                                fluid
                                search
                                selection
                                options={this.props.stores}
                                onChange={this.handleStoresChange}
                            />
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


export { CreateSaleModal, EditSaleModal }