import './Dropdown.scss';
import React, { Component, PropTypes } from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import classnames from 'classnames';

export default class Dropdown extends Component {
    constructor (props) {
        super(props);

        this.state = {
            dropdownOpen: this.props.isOpen
        }

        this.handleToggleDropdown = this.handleToggleDropdown.bind(this);
    }

    componentWillReceiveProps(newProps) {
        const { isOpen } = newProps;

        if (this.state.dropdownOpen !== isOpen) {
            this.setState({
                dropdownOpen: isOpen
            });
        }
    }

    handleToggleDropdown (e) {
        e.preventDefault();

        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render () {
        const { children, position, label } = this.props;
        const contentClassName = classnames(
            'dropdown__inner-content',
            {
                'dropdown__inner-content--open': this.state.dropdownOpen
            },
            `dropdown__inner-content--${position}`
        );
        const overlayClassName = classnames(
            'dropdown__overlay',
            {
                'dropdown__overlay--shown': this.state.dropdownOpen
            }
        );

        return (
            <Nav className="dropdown">
                <NavItem eventKey={1} href="#" onClick={this.handleToggleDropdown}>
                    {label}
                </NavItem>
                <section id="dropdownContent" className={contentClassName}>
                    {children}
                </section>
                <div className={overlayClassName} onClick={this.handleToggleDropdown} />
            </Nav>
        );
    }
}

Dropdown.propTypes = {
    label: PropTypes.string.isRequired,
    position: PropTypes.oneOf([
        'left', 'right'
    ]),
    children: PropTypes.element.isRequired,
    isOpen: PropTypes.bool
}

Dropdown.defaultProps = {
    isOpen: false,
    position: 'right'
}