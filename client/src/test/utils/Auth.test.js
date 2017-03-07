import { difference } from 'lodash';
import { SessionStorageMock } from 'src/test/mocks';
import Auth from 'src/utils/Auth';
import expect from 'expect';

global.sessionStorage = new SessionStorageMock;

it('Should import an object with expected props', function () {
    const properties = Object.keys(Auth);
    const expectedProps = ['initialize', 'reset', 'getToken', 'getUserId'];

    expect(difference(properties, expectedProps).length).toBe(0);
})

it('Should initialize a session', function () {
    const token = '7a86sd76as87d6a87sd687a6sd86as87da';
    const userId = '1';

    Auth.initialize(token, userId);

    expect(Auth.getUserId()).toBe(userId);
    expect(Auth.getToken()).toBe(token);
})

it('Should reset a session', () => {
    const empty = '';

    Auth.reset();

    expect(Auth.getToken()).toBe(empty);
    expect(Auth.getUserId()).toBe(empty);
})