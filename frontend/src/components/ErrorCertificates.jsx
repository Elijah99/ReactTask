import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import ClearIcon from "@mui/icons-material/Clear";

const errorCertificates = ({ errorMessage, handleClearError }) => {
    return (
        <div className="d-flex justify-content-between mt-3 bg-white py-2 px-3">
            <div className="d-flex flex-row">
                <CancelIcon color="errorCertificates" fontSize="large" />
                <h4 className="px-3 text-danger">{errorMessage}</h4>
            </div>
            <ClearIcon color="errorCertificates" fontSize="large" onClick={handleClearError} />
        </div>
    )
}

export default errorCertificates;