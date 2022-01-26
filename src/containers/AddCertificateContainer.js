import { createCertificate, deleteTags } from "../action/createActions";
import { connect } from "react-redux";
import AddCertificate from "../components/AddCertificate";

const mapStateToProps = state => ({
    certificates: state.certificates,
    tags: state.tags,
    title: 'Add new certificate',
    buttonVariant: 'primary',
    buttonText: 'Add new'
});

const mapDispatchToProps = dispatch => ({
    handleAddOrEditCertificate: (certificate, tags) => {
        dispatch(createCertificate(certificate, tags))
    },
    handleDeleteTags: () => {
        dispatch(deleteTags())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCertificate);