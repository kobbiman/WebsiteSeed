import Api from 'src/utils/Api';
import expect from 'expect';
import { difference } from 'lodash';

let apiInstance;

it('Should instanciate an object', function () {
    apiInstance = new Api;

    expect(typeof apiInstance).toBe('object');
});

it('Should instanciate an object with these properties', function () {
    const mustHaveProps = [ 'request', 'delete', 'head', 'post', 'put', 'patch'];
    const properties = Object.keys(apiInstance);

    expect(difference(properties, mustHaveProps).length).toBe(0);
});