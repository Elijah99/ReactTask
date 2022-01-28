import { putCertificate, deleteTags } from "../action/createActions";
import { connect } from "react-redux";
import AddOrEditCertificate from "../components/AddOrEditCertificate";

const mapStateToProps = state => ({
    certificates: state.certificates,
    tags: state.tags,
    title: 'Edit certificate',
    buttonVariant: 'warning',
    buttonText: 'Edit'
});

const mapDispatchToProps = dispatch => ({
    handleAddOrEditCertificate: (certificate, tags) => {
        dispatch(putCertificate(certificate, tags))
    },
    handleDeleteTags: () => {
        dispatch(deleteTags())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddOrEditCertificate);