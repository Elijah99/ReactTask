import {
    changeFilter,
    clearError,
    deleteCertificate,
    fetchCertificateById,
    fetchCertificates,
    searchCertificates,
    sortByCreateDate,
    sortByName,
    sortCertificates
} from "../action/createActions";
import { connect } from "react-redux";
import Certificates from "../components/Certificates";

const mapStateToProps = (state) => {
    return {
        certificates: state.certificates,
        auth: state.auth,
        certificatesMetadata: state.certificatesMetadata,
        certificatesError: state.certificatesError
    }
}

const mapDispatchToProps = dispatch => ({
    handleFetchCertificates: (sort, order, number, size) => {
        dispatch(fetchCertificates(sort, order, number, size));
    },
    handleSearchCertificates: (filter, number, size) => {
        dispatch(searchCertificates(filter, number, size));
    },
    handleClearError: () => {
        dispatch(clearError());
    },
    handleChangeFilter: (filter) => {
        dispatch(changeFilter(filter))
    },
    handleSortCertificates: (sort, order, number, size) => {
        dispatch(sortCertificates(sort, order, number, size));
    },
    handleChangeOrderCreateDate: (order) => {
        dispatch(sortByCreateDate(order))
    },
    handleChangeOrderName: (order) => {
        dispatch(sortByName(order))
    },
    handleDeleteCertificate: (id) => {
        dispatch(deleteCertificate(id))
    },
    handleViewCertificate: (id) => {
        dispatch(fetchCertificateById(id))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Certificates);