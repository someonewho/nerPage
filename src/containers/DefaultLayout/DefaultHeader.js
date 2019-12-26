import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Nav} from "reactstrap";
import {Link} from "react-router-dom";
import {AppNavbarBrand} from "@coreui/react";

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
    render() {
        // eslint-disable-next-line
        const {children, ...attributes} = this.props;

        return (
            <div>
                <React.Fragment>
                    <Nav className="d-md-down-none" navbar>
                        <Link to="/home" style={{textDecoration: "none", color: "black"}}>
                            <AppNavbarBrand>
                                ISOFT LAB
                            </AppNavbarBrand>
                        </Link>
                    </Nav>
                </React.Fragment>
            </div>
        );
    }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
