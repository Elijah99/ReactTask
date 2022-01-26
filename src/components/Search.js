import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

const search = ({ handleFetchCertificates, handleSearchCertificates, handleChangeFilter, page, filter, sort, order }) => {
    const handleChange = (event) => {
        let filter = event.target.value;
        handleChangeFilter(filter);
        if (filter.trim() === '') {
            handleFetchCertificates(sort, order, 1, page.size);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (filter.trim() !== '') {
            handleSearchCertificates(filter, 1, page.size);
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <InputGroup className="mt-3" size="lg">
                <Form.Control type="text" placeholder="Search" onChange={handleChange} value={filter} />
                <Button type="submit">Search</Button>
            </InputGroup>
        </Form>
    )
}

export default search;