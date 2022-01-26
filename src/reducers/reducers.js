import {
    ADD_TAG,
    ADD_TAGS,
    AUTH_ERROR,
    AUTH_LOGIN,
    AUTH_LOGOUT,
    CERTIFICATES_ERROR,
    CHANGE_FILTER,
    CHANGE_IS_ADDED,
    CHANGE_IS_LOADED,
    CLEAR_CERTIFICATES_ERROR,
    DELETE_TAG,
    DELETE_TAGS,
    RECEIVE_CERTIFICATE,
    RECEIVE_CERTIFICATES,
    RECEIVE_CERTIFICATES_METADATA,
    SORT_BY_CREATE_DATE,
    SORT_BY_NAME
} from "../action/actionTypes";

export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case AUTH_LOGIN:
            return {
                ...state,
                loggedIn: action.loggedIn,
                user: action.user
            };
        case AUTH_LOGOUT:
            return {
                ...state,
                loggedIn: action.loggedIn,
                user: action.user
            }
        default:
            return state;
    }
}

export const authErrorReducer = (state = {}, action) => {
    switch (action.type) {
        case AUTH_ERROR:
            return {
                ...state,
                isAuthError: action.isAuthError,
                errorMassage: action.errorMassage
            }
        default:
            return state;
    }
}

export const certificatesReducer = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_CERTIFICATES:
            return action.certificates
        default:
            return state;
    }
}

export const certificateReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_CERTIFICATE:
            return action.certificate
        default:
            return state;
    }
}

const initialStateCertificatesMetadata = {
    page: {
        size: 10,
        totalElements: 0,
        totalPages: 0,
        number: 1
    },
    filter: '',
    sort: 'createDate',
    order: 'desc',
    isLoaded: false,
    isAdded: false
}

export const certificatesMetadataReducer = (state = initialStateCertificatesMetadata, action) => {
    switch (action.type) {
        case RECEIVE_CERTIFICATES_METADATA:
            return {
                ...state,
                page: {
                    size: action.page.size,
                    totalElements: action.page.totalElements,
                    totalPages: action.page.totalPages,
                    number: action.page.number
                },
                isLoaded: action.isLoaded
            }
        case CHANGE_IS_LOADED:
            return {
                ...state,
                isLoaded: action.isLoaded
            }
        case CHANGE_FILTER:
            return {
                ...state,
                filter: action.filter
            }
        case SORT_BY_CREATE_DATE:
            return {
                ...state,
                sort: action.sort,
                order: action.order
            }
        case SORT_BY_NAME:
            return {
                ...state,
                sort: action.sort,
                order: action.order
            }
        case CHANGE_IS_ADDED:
            return {
                ...state,
                isAdded: action.isAdded
            }
        default:
            return state;
    }
}

const initialStateCertificatesError = {
    isCertificatesError: false,
    errorMassage: ''
}

export const certificatesErrorReducer = (state = initialStateCertificatesError, action) => {
    switch (action.type) {
        case CERTIFICATES_ERROR:
            return {
                ...state,
                isCertificatesError: action.isCertificatesError,
                errorMassage: action.errorMassage
            }
        case CLEAR_CERTIFICATES_ERROR:
            return {
                ...state,
                isCertificatesError: action.isCertificatesError,
                errorMassage: action.errorMassage
            }
        default:
            return state;
    }
}

export const tagsReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_TAG:
            return [...state, action.tag];
        case DELETE_TAG:
            return state.filter((tag, index) => index !== action.index);
        case ADD_TAGS:
            return action.tags;
        case DELETE_TAGS:
            return action.tags;
        default:
            return state;
    }
}