import React, { Component } from 'react';

export class Customer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            customers: [],
            loading: true
        }
    }

    render() {
        return (
            <p>here is list of customer</p>
            );
    }

}