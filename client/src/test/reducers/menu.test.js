import expect from 'expect';
import Immutable from 'immutable';
import { sample } from 'lodash';
import actionTypes from 'src/constants/actionTypes';
import menuReducer from 'src/reducers/menu';

describe('Reducer :: Menu', () => {

    const initialState = Immutable.fromJS({
        isFetching: false,
        success: false,
        error: null,
        data: []
    });

    const fetchingState = initialState.merge({
        isFetching: true
    });

    it('should set initial state properly', () => {
        const result = menuReducer(undefined, {});

        expect(result.toJS()).toEqual(initialState.toJS());
    });

    it('should change state properly when a MENUS_GET_REQUEST or MENU_LINKS_GET_REQUEST action is dispatched', () => {
        const possibleActionTypes = [
            actionTypes.MENUS_GET_REQUEST,
            actionTypes.MENU_LINKS_GET_REQUEST
        ];
        const result = menuReducer(initialState, {
            type: sample(possibleActionTypes)
        });
        const expectedState = initialState.merge({
            isFetching: true
        });

        expect(result.toJS()).toEqual(expectedState.toJS());
    })

    it('should change state properly when a MENUS_GET_FAILURE or MENU_LINKS_GET_FAILURE action is dispatched', () => {
        const possibleActionTypes = [
            actionTypes.MENUS_GET_FAILURE,
            actionTypes.MENU_LINKS_GET_FAILURE
        ];
        const error = { code: '500' };
        const result = menuReducer(initialState, {
            type: sample(possibleActionTypes),
            payload: {
                error
            }
        });
        const expectedState = fetchingState.merge({
            isFetching: false,
            error
        });

        expect(result.toJS()).toEqual(expectedState.toJS());
    })

    it('should change state properly when a MENUS_GET_SUCCESS action is dispatched', () => {
        const data = [
            {
                "name": "Main Menu",
                "machineName": "main-menu",
                "description": "Main site menu, it is shown to visitors.",
                "id": 1
            },
            {
                "name": "Administrative Menu",
                "machineName": "administrative-menu",
                "description": "Administration menu, it is shown only to logged in users.",
                "id": 2
            }
        ];
        const result = menuReducer(initialState, {
            type: actionTypes.MENUS_GET_SUCCESS,
            payload: {
                data
            }
        });
        const expectedState = fetchingState.merge({
            isFetching: false,
            success: true,
            data
        });

        expect(result.toJS()).toEqual(expectedState.toJS());
    })

    it('should change state properly when a MENU_LINKS_GET_SUCCESS action is dispatched', () => {
        const stateWithLoadedMenus = initialState.merge({
            data: [
                {
                    "name": "Main Menu",
                    "machineName": "main-menu",
                    "description": "Main site menu, it is shown to visitors.",
                    "id": 1
                },
                {
                    "name": "Administrative Menu",
                    "machineName": "administrative-menu",
                    "description": "Administration menu, it is shown only to logged in users.",
                    "id": 2
                }
            ]
        });
        const stateWithLoadedMenusFetching = stateWithLoadedMenus.merge({
            isFetching: true
        });
        const data = [
            {
                "name":"Home",
                "url":"/",
                "label":"Home",
                "id":1,"menuId":1
            },
            {
                "name":"Contact Us",
                "url":"/contact-us",
                "label":"Contact Us",
                "id":2,
                "menuId":1
            }
        ];
        const result = menuReducer(stateWithLoadedMenus, {
            type: actionTypes.MENU_LINKS_GET_SUCCESS,
            payload: {
                data
            }
        });
        const expectedState = stateWithLoadedMenusFetching.mergeDeep({
            isFetching: false,
            success: true,
            data: [
                {
                    "name": "Main Menu",
                    "machineName": "main-menu",
                    "description": "Main site menu, it is shown to visitors.",
                    "id": 1,
                    "links": data
                }
            ]
        });

        expect(result.toJS()).toEqual(expectedState.toJS());
    })

});