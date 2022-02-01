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
} from "./actionTypes";
import {
    createCertificateApi,
    createTagInGiftCertificateApi,
    editCertificateApi,
    deleteCertificateApi,
    fetchCertificateByIdApi,
    searchCertificatesApi,
    sortCertificatesApi
} from "../services/certificate.service";
import { checkAuth } from "../services/auth.service";

export const authLogin = (loggedIn, user) => ({
    type: AUTH_LOGIN,
    loggedIn: loggedIn,
    user: user
});

export const authLogout = () => ({
    type: AUTH_LOGOUT,
    loggedIn: false,
    user: {}
});

export const authError = (isAuthError, errorMassage) => ({
    type: AUTH_ERROR,
    isAuthError: isAuthError,
    errorMassage: errorMassage
});

export const receiveCertificates = (certificates) => ({
    type: RECEIVE_CERTIFICATES,
    certificates: certificates
});

export const receiveCertificatesMetadata = (page, isLoaded) => ({
    type: RECEIVE_CERTIFICATES_METADATA,
    page: page,
    isLoaded: isLoaded
});

export const certificatesError = (isCertificatesError, errorMassage) => ({
    type: CERTIFICATES_ERROR,
    isCertificatesError: isCertificatesError,
    errorMassage: errorMassage
});

export const clearError = () => ({
    type: CLEAR_CERTIFICATES_ERROR,
    isCertificatesError: false,
    errorMassage: ''
});

export const changeIsLoaded = (isLoaded) => ({
    type: CHANGE_IS_LOADED,
    isLoaded: isLoaded
});

export const changeFilter = (filter) => ({
    type: CHANGE_FILTER,
    filter: filter
});

export const sortByCreateDate = (order) => ({
    type: SORT_BY_CREATE_DATE,
    sort: 'createDate',
    order: order
});

export const sortByName = (order) => ({
    type: SORT_BY_NAME,
    sort: 'name',
    order: order
});

export const addTag = (tag) => ({
    type: ADD_TAG,
    tag: tag
});

export const deleteTag = (index) => ({
    type: DELETE_TAG,
    index: index
});

export const addTags = (tags) => ({
    type: ADD_TAGS,
    tags: tags
});

export const deleteTags = () => ({
    type: DELETE_TAGS,
    tags: []
});

export const changeIsAdded = (isAdded) => ({
    type: CHANGE_IS_ADDED,
    isAdded: isAdded
});

export const receiveCertificate = (certificate) => ({
    type: RECEIVE_CERTIFICATE,
    certificate: certificate
});

export const fetchCertificates = (sort, order, number, size) => {
    return (dispatch) => {
        handleFetchCertificates(sortCertificatesApi(sort, order, number, size), dispatch);
    }
}

export const searchCertificates = (filter, number, size) => {
    return (dispatch) => {
        handleFetchCertificates(searchCertificatesApi(filter, number, size), dispatch);
    }
}

export const sortCertificates = (sort, order, number, size) => {
    return (dispatch) => {
        handleFetchCertificates(sortCertificatesApi(sort, order, number, size), dispatch);
    }
}

const handleFetchCertificates = (result, dispatch) => {
    result
        .then(response => {
            return checkError(response, dispatch);
        })
        .then(
            data => {
                let certificateList = data._embedded.giftCertificateRepresentationList;
                dispatch(receiveCertificates(certificateList));
                dispatch(receiveCertificatesMetadata(data.page, true));
            },
            error => {
                if (error.status !== 401) {
                    dispatch(certificatesError(true, `${error.status} : ${error.statusText}`));
                    dispatch(changeIsLoaded(true));
                    setTimeout(() => {
                        dispatch(clearError())
                    }, 1000);
                }
            }
        )
}

export const createCertificate = (certificate, tags) => {
    return (dispatch) => {
        let tagNames = Array.from(tags.values());
        let newTags = new Array();

        tagNames.forEach(tag => {
            newTags.push({ 'name': tag.name });
        }
        );

        let newCertificate = { ...certificate, tags: newTags }
        createCertificateApi(newCertificate)
            .then(response => {
                return checkResponseStatus(response);
            })
    }
}

export const putCertificate = (certificate, tags) => {
    return (dispatch) => {
        let tagNames = Array.from(tags.values());
        let newTags = new Array();

        tagNames.forEach(tag => {
            newTags.push({ 'name': tag.name });
        });
        debugger;
        let newCertificate = { ...certificate, tags: newTags }
        editCertificateApi(newCertificate)
            .then(response => {
                return checkResponseStatus(response);
            })

    }
}

export const deleteCertificate = (id) => {
    return (dispatch) => {
        deleteCertificateApi(id)
            .then(response => {
                if (response.status === 204) {
                    console.log('SUCCESS DELETE')
                } else {
                    if (response.status === 401) {
                        dispatch(authLogout());
                    } else {
                        dispatch(certificatesError(true, `${response.status} : ${response.statusText}`));
                        setTimeout(() => {
                            dispatch(clearError())
                        }, 1000);
                    }
                }
            }
            )
    }
}

export const fetchCertificateById = (id) => {
    return (dispatch) => {
        fetchCertificateByIdApi(id)
            .then(response => {
                return checkError(response, dispatch);
            })
            .then(
                data => {
                    dispatch(receiveCertificate(data))
                },
                error => {
                    if (error.status !== 401) {
                        dispatch(certificatesError(true, `${error.status} : ${error.statusText}`));
                        setTimeout(() => {
                            dispatch(clearError())
                        }, 1000);
                    }
                }
            )
    }
}

const checkError = (response, dispatch) => {
    if (!checkAuth(response)) {
        dispatch(authLogout());
        return Promise.reject({ status: response.status, statusText: response.statusText });
    }
    if (response.status < 200 || (response.status >= 300 && response.status !== 401)) {
        return response.json().then(data => {
            let errorMessage = 'Error is occurred';
            if (data.errorMessage) {
                errorMessage = data.errorMessage;
            }
            console.log(data.errorMessage);
            return Promise.reject({
                status: response.status,
                statusText: response.statusText ? response.statusText : errorMessage
            });
        });
    }
    return response.json();
}

const checkResponseStatus = (response) => {
    if (response.status === 201) {
        return response.json();
    }
    if (response.status === 403) {
        return Promise.reject({
            status: response.status,
            statusText: 'Accesses denied'
        });
    }
    if (response.status === 401) {
        return Promise.reject({
            status: response.status,
            statusText: 'Unauthorized'
        });
    }
    if (response.status === 400) {
        return Promise.reject({
            status: response.status,
            statusText: 'Bad request'
        });
    }
}