import Immutable from 'immutable';
import actionTypes from 'src/constants/actionTypes';

const initialState = Immutable.fromJS({
    isFetching: false,
    error: null,
    success: false,
    data: []
});

const groupLinks = links => {
    const groupedLinks = {};

    links.forEach(link => {
        if (!groupedLinks[link.menuId]) {
            groupedLinks[link.menuId] = [link]
        } else {
            groupedLinks[link.menuId].push(link);
        }
    });

    return groupedLinks;
}

const addLinksToMenu = links => immMenu => {
    const menuLinks = links[immMenu.get('id')];

    if (menuLinks) {
        return immMenu.merge({
            links: menuLinks
        });
    }

    return immMenu;
}

export default function menuReducer (state = initialState, action) {
    switch (action.type) {
        case actionTypes.MENUS_GET_REQUEST:
        case actionTypes.MENU_LINKS_GET_REQUEST:
            return state.merge({
                isFetching: true
            });
        case actionTypes.MENUS_GET_FAILURE:
        case actionTypes.MENU_LINKS_GET_FAILURE:
            return state.merge({
                isFetching: false,
                error: action.payload.error
            });
        case actionTypes.MENUS_GET_SUCCESS:
            return state.merge({
                isFetching: false,
                success: true,
                data: action.payload.data
            });
        case actionTypes.MENU_LINKS_GET_SUCCESS:
            return state.merge({
                isFetching: false,
                success: true,
                data: state.get('data').map(addLinksToMenu(groupLinks(action.payload.data)))
            });
        default:
            return state;
    }
}