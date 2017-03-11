import Immutable from 'immutable';
import actionTypes from 'src/constants/actionTypes';

const initialState = Immutable.fromJS({
    isFetching: false,
    success: false,
    error: null,
    layoutPlaces: {},
    layouts: {},
    layoutContainers: {},
    blocks: {},
    components: {},
    componentTypes: {}
});

function toObject (collection) {
    const object = {};

    collection.forEach(item => {
        object[item.id] = item;
    });

    return object;
}

export default function layoutReducer (state = initialState, action) {
    switch (action.type) {
        case actionTypes.COMPONENT_TYPES_GET_REQUEST:
        case actionTypes.COMPONENTS_GET_REQUEST:
        case actionTypes.BLOCKS_GET_REQUEST:
        case actionTypes.LAYOUT_CONTAINERS_GET_REQUEST:
        case actionTypes.LAYOUTS_GET_REQUEST:
        case actionTypes.LAYOUT_PLACES_GET_REQUEST:
            return state.merge({
                isFetching: true,
                error: null,
                success: false
            });
        case actionTypes.COMPONENT_TYPES_GET_FAILURE:
        case actionTypes.COMPONENTS_GET_FAILURE:
        case actionTypes.BLOCKS_GET_FAILURE:
        case actionTypes.LAYOUT_CONTAINERS_GET_FAILURE:
        case actionTypes.LAYOUTS_GET_FAILURE:
        case actionTypes.LAYOUT_PLACES_GET_FAILURE:
            return state.merge({
                isFetching: false,
                error: action.payload.error
            });
        case actionTypes.LAYOUT_PLACES_GET_SUCCESS:
            return state.merge({
                isFetching: false,
                success: true,
                layoutPlaces: toObject(action.payload.data)
            });
        case actionTypes.LAYOUTS_GET_SUCCESS:
            return state.mergeDeep({
                isFetching: false,
                success: true,
                layouts: toObject(action.payload.data)
            });
        case actionTypes.LAYOUT_CONTAINERS_GET_SUCCESS:
            return state.mergeDeep({
                isFetching: false,
                success: true,
                layoutContainers: toObject(action.payload.data)
            });
        case actionTypes.BLOCKS_GET_SUCCESS:
            return state.mergeDeep({
                isFetching: false,
                success: true,
                blocks: toObject(action.payload.data)
            });
        case actionTypes.COMPONENTS_GET_SUCCESS:
            return state.mergeDeep({
                isFetching: false,
                success: true,
                components: toObject(action.payload.data)
            });
        case actionTypes.COMPONENT_TYPES_GET_SUCCESS:
            return state.mergeDeep({
                isFetching: false,
                success: true,
                componentTypes: toObject(action.payload.data)
            });
        default:
            return state;
    }
}