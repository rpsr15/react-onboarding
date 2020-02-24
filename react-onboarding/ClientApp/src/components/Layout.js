import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';


const Footer = ({ title }) => (<footer>{title}</footer>);
export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div>
                <NavMenu />
                <Container>
                    {this.props.children}
                </Container>
                <Footer title={"Ravi Singh Rathore"} />
            </div>
        );
    }
}
