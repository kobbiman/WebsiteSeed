import React from 'react';
import ReactDOM from 'react-dom';
import { SessionStorageMock } from 'src/test/mocks';
import Popover from 'src/components/Common/Popover/Popover';
import { shallow } from 'enzyme';
import expect from 'expect';

global.sessionStorage = new SessionStorageMock;

describe('Component :: Common :: Popover', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Popover><div /></Popover>, div);
    });

    it('is shown when isOpen prop is true', () => {
        const component = shallow(<Popover isOpen={false}><div /></Popover>);
        const hiddenClass = 'popover__inner-content--open';

        expect(component.find('#popoverContent').hasClass(hiddenClass)).toBe(false);
    })

    it('is hidden when isOpen prop is false', () => {
        const component = shallow(<Popover isOpen={true}><div /></Popover>);
        const hiddenClass = 'popover__inner-content--open';

        expect(component.find('#popoverContent').hasClass(hiddenClass)).toBe(true);
    })

    it('is hidden when overlay is touched', () => {
        const isOpen = true;
        const localState = {
            isOpen
        }
        const handleToggle = () => localState.isOpen = !localState.isOpen;
        const component = shallow(<Popover isOpen={isOpen} onToggle={handleToggle}><div /></Popover>);

        component.find('#popoverOverlay').simulate('click');

        expect(localState.isOpen).toBe(false);
    })

});