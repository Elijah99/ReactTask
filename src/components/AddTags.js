import React from "react";
import { WithContext as ReactTags } from 'react-tag-input';
import "./AddTags.css";
import Form from "react-bootstrap/Form";
import { Button, InputGroup } from "react-bootstrap";

const AddTags = ({ tags, handleAddTag, handleDeleteTag, handleAddTags, handleChange, values, errors }) => {

    if ((tags === undefined || tags.length === 0) && values.tags.length !== 0) {
        handleAddTags(values.tags);
        values.tags = [];
    }

    const KeyCodes = {
        comma: 188,
        enter: 13,
    };

    const delimiters = [KeyCodes.comma, KeyCodes.enter];

    const handleDelete = (i) => {
        handleDeleteTag(i);
    };

    const handleAddition = () => {
        let value = values.tag.trim();
        if (value === '' || value.length < 3 || value.length > 15) {
            return;
        }
        handleAddTag({ id: values.tag, text: values.tag, name: values.tag });
    };

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = [...tags].slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        handleAddTags(newTags);
    };

    function parseTags(tags) {
        let tagNames = Array.from(tags.values());
        let newTags = [];

        tagNames.forEach(tag => {
            newTags.push({ 'id': tag.name, 'text': tag.name });
        }
        );
        return newTags;

    }

    return (
        <>
            <InputGroup>
                <Form.Control
                    type="text"
                    placeholder="AddTags"
                    name="tag"
                    value={values.tag}
                    onChange={handleChange}
                    isInvalid={!!errors.tag}
                />
                <Button variant="primary" onClick={handleAddition}>Add</Button>
                <Form.Control.Feedback type="invalid">
                    {errors.tag}
                </Form.Control.Feedback>
            </InputGroup>

            <div className="d-flex justify-content-center my-4 align-self-center">
                <ReactTags
                    tags={parseTags(tags)}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    handleDrag={handleDrag}
                    delimiters={delimiters} />
            </div>
        </>
    )
}



export default AddTags;