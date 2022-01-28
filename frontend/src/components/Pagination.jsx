import React from "react";
import Pagination from "@mui/material/Pagination";

const pagination = ({ page, handleFetchCertificates, handleSearchCertificates, filter, sort, order }) => {
    const handleNumberPageChange = (event, value) => {
        if (filter.trim() === '') {
            handleFetchCertificates(sort, order, value, page.size);
        } else {
            handleSearchCertificates(filter, value, page.size);
        }
    }

    const handleRowPerPageChange = (event) => {
        let value = event.target.value;
        if (page.totalElements / parseInt(value) < page.number) {
            if (filter.trim() === '') {
                handleFetchCertificates(sort, order, 1, value);
            } else {
                handleSearchCertificates(filter, 1, value);
            }
            return;
        }
        if (filter.trim() === '') {
            handleFetchCertificates(sort, order, page.number, value);
        } else {
            handleSearchCertificates(filter, page.number, value);
        }
    }

    return (
        <div className="d-flex mb-3">
            <div className="flex-grow-1 d-flex justify-content-center">
                <Pagination count={page.totalPages} page={page.number} variant="outlined" shape="rounded"
                    onChange={handleNumberPageChange} />
            </div>
            <div className="flex-grow-0">
                <select onChange={handleRowPerPageChange} value={page.size}>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
            </div>
        </div>
    )
}

export default pagination;