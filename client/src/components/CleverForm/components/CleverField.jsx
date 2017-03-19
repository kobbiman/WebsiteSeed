import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

const VALID_YES = 'yes';
const VALID_NO = 'no';

export default class CleverField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            valid: '',
            value: props.field.defaultValue
        }

        this.buildField = this.buildField.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange (event) {
        const { field: { name, validation, onChange: onChangeField }, onChange } = this.props;
        const { value } = event.target;
        const validationResult = validation(value);
        const valid = validationResult ? VALID_YES : VALID_NO;

        this.setState({
            valid,
            value
        });

        onChange({
            name,
            valid: validationResult,
            value
        });
        onChangeField(event);
    }

    buildField () {
        const { field: { name, type, className, placeholder }, classPrefix } = this.props;
        const { valid, value } = this.state;
        const classNames = classnames(
            `${classPrefix}__control`,
            className,
            {
                [`${classPrefix}__control--valid`]: valid === VALID_YES
            },
            {
                [`${classPrefix}__control--not-valid`]: valid === VALID_NO
            }
        );
        const commonProps = {
            id: name,
            name,
            className: classNames,
            onChange: this.handleOnChange,
            placeholder,
        };
        let options;

        switch (type) {
            case 'password':
                return <input type="password" value={value} {...commonProps} />;
            case 'number':
                return <input type="number" value={value} {...commonProps} />;
            case 'text':
                return <textarea {...commonProps}>{value}</textarea>;
            case 'select':
                options = this.field.options.map((option, index) => (
                    <option key={index} value={option.value} selected={option.value === value}>
                        {option.label}
                    </option>
                ));

                return (
                    <select {...commonProps}>
                        {options}
                    </select>
                );
            case 'radio':
            case 'checkbox':
                return <input type={type} value={value} checked={this.props.field.checked} {...commonProps} />;
            case 'checkbox-group':
            case 'radio-group':
                const optionType = type.split('-')[0];
                options = this.field.options.map((option, index) => (
                    <div key={index}>
                        <input type={optionType} name={name} value={option.value} checked={option.value === value} {...commonProps} />
                        <label>{option.label}</label>
                    </div>
                ));

                return (
                    <div>
                        {options}
                    </div>
                );
            case 'string':
            default:
                return <input type="text" value={this.state.value} {...commonProps}/>;
        }
    }

    render () {
        const { field: { label, name, errorMessage }, classPrefix } = this.props;
        const { valid } = this.state;
        const fieldComponent = this.buildField();
        const className = classnames(
            `${classPrefix}__field`,
            {
                [`${classPrefix}__field--valid`]: valid === VALID_YES
            },
            {
                [`${classPrefix}__field--not-valid`]: valid === VALID_NO
            }
        );
        let labelElement, error;

        if (label) {
            const className = classnames(
                `${classPrefix}__label`,
                {
                    [`${classPrefix}__label--valid`]: valid === VALID_YES
                },
                {
                    [`${classPrefix}__label--not-valid`]: valid === VALID_NO
                }
            );
            labelElement = (
                <label htmlFor={name} className={className}>
                    {label}
                </label>
            );
        }

        if (valid === VALID_NO) {
            error = (
                <div className={`${classPrefix}__error`}>
                    {errorMessage}
                </div>
            )
        }

        return (
            <div className={className}>
                {labelElement}
                {fieldComponent}
                {error}
            </div>
        );
    }
}

CleverField.propTypes = {
    field: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    classPrefix: PropTypes.string.isRequired
}