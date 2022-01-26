import { addTag, addTags, deleteTag } from "../action/createActions";
import { connect } from "react-redux";
import AddTags from "../components/AddTags";

const mapStateToProps = state => (
    {
        tags: state.tags
    })

const mapDispatchToProps = dispatch => ({
    handleAddTag: tag => {
        dispatch(addTag(tag))
    },
    handleDeleteTag: index => {
        dispatch(deleteTag(index))
    },
    handleAddTags: tags => {
        dispatch(addTags(tags))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddTags);