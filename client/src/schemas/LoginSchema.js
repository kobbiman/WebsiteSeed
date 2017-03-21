import Schema from 'src/utils/Schema';

const getErrorMessage = field => `Provided value for ${field} field is invalid`;

export default Schema({
    username: {
        name: 'username',
        type: 'string',
        label: 'Username',
        placeholder: 'juan@perez.com',
        errorMessage: getErrorMessage('username'),
        validation: value => value.length > 3 && value.length < 10
    },
    password: {
        name: 'password',
        type: 'password',
        label: 'Password',
        placeholder: '*********',
        errorMessage: getErrorMessage('password'),
        validation: value => value.length > 4 && value.length < 20
    },
    rememberme: {
        name: 'rememberme',
        type: 'checkbox',
        label: 'Remember me',
        value: true,
        checked: true
    }
});