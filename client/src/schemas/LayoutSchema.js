import Schema from 'src/utils/Schema';

const getErrorMessage = field => `Provided value for ${field} field is invalid`;

export default Schema({
    name: {
        name: 'name',
        type: 'string',
        label: 'Name',
        errorMessage: getErrorMessage('name'),
        validation: value => value.length > 0
    },
    columns: {
        name: 'columns',
        type: 'number',
        label: 'Columns',
        errorMessage: getErrorMessage('columns'),
        validation: value => value >= 0 && value <= 12
    },
    layoutPlaceId: {
        name: 'layoutPlaceId',
        type: 'select',
        label: 'Layout',
        errorMessage: getErrorMessage('layout place'),
        options: [],
        validation: value => !!value
    }
});