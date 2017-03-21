import './ModalWindow.scss';

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Button from 'src/components/Common/Button/Button';

export default class ModalWindow extends Component {
    render () {
        const { children, isOpen, onClose, size, title } = this.props;
        const className = classnames(
            'modal-window',
            `modal-window--${size}`,
            {
                'modal-window--open': isOpen
            }
        );
        const overlayClassName = classnames(
            'modal-window__overlay',
            {
                'modal-window__overlay--shown': isOpen
            }
        );
        let titleElement;

        if (title) {
            titleElement = (
                <h3 className="modal-window__title">
                    {title}
                </h3>
            );
        }

        return (
            <section>
                <section className={className}>
                    <Button icon="close" onClick={onClose} modifier="inverse" position="right" />
                    {titleElement}
                    {children}
                </section>
                <div className={overlayClassName} onClick={onClose} />
            </section>
        );
    }
}

ModalWindow.propTypes = {
    children: PropTypes.element.isRequired,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    size: PropTypes.oneOf([
        'sm',
        'md',
        'lg',
        'xl',
    ]),
    title: PropTypes.string,
}

ModalWindow.defaultProps = {
    isOpen: false,
    onClose: () => {},
    size: 'md',
    title: '',
}