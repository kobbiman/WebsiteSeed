import './index.scss';

import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

import CleverField from './components/CleverField';

export default class CleverForm extends Component {
    constructor (props) {
        super (props);

        this.state = {
            fields: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdateFormState = this.handleUpdateFormState.bind(this);
    }

    handleSubmit (event) {
        event.preventDefault();

        const { onSubmit } = this.props;
        const notInvalidFields = !Object.keys(this.state.fields).find(name => !this.state.fields[name].valid );

        if (notInvalidFields) {
            onSubmit();
        }

        return false;
    }

    handleUpdateFormState ({name, value, valid}) {
        this.setState({
            fields: _.extend(_.clone(this.state.fields), {
                [name]: {
                    value, valid
                }
            })
        });
    }

    render () {
        const { schema, classPrefix } = this.props;
        const fields = schema.map((field, index) => <CleverField key={index} classPrefix={classPrefix} field={field} onChange={this.handleUpdateFormState} />);
        const uiLabels = {
            submit: 'Submit'
        }

        return (
            <form
                autoComplete={'new-password'}
                onSubmit={this.handleSubmit}
                className={classPrefix}
            >
                {fields}
                <button
                    className={`${classPrefix}__button-submit`}
                    type="submit"
                >
                    {uiLabels.submit}
                </button>
            </form>
        );
    }
}

CleverForm.propTypes = {
    schema: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
    classPrefix: PropTypes.string
}

CleverForm.defaultProps = {
    classPrefix: 'clever-form'
}