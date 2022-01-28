const API_URL_CERTIFICATES = "http://localhost:8087/giftCertificates";

function parseFilterValue(filter) {
    let words = filter.split(/\s(?!((\s*\w*)*\))|\s)/);
    let result = "";
    for (let element in words) {
        if (words[element] !== undefined) {
            result += words[element].trim();
            if (element !== words.length) {
                result += ",";
            }
        }
    }
    return result;
}

export async function getCertificates(number, size) {
    return await fetch(`${API_URL_CERTIFICATES}?page=${number}&pageSize=${size}`);
}

export async function searchCertificatesApi(filter, number, size) {
    const parsedFilter = parseFilterValue(filter);
    return await fetch(
        `${API_URL_CERTIFICATES}?searchValue=${parsedFilter}&page=${number}&pageSize=${size}`
    );
}

export async function sortCertificatesApi(sort, order, number, size) {
    return await fetch(
        `${API_URL_CERTIFICATES}?sortValue=${sort}&sortType=${order}&page=${number}&pageSize=${size}`
    );
}

export async function createCertificateApi(certificate) {
    return await fetch(`${API_URL_CERTIFICATES}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "POST",
        body: JSON.stringify(certificate),
    });
}
export async function editCertificateApi(certificate) {
    return await fetch(`${API_URL_CERTIFICATES}/` + certificate.id, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "PUT",
        body: JSON.stringify(certificate),
    });
}

export async function createTagInGiftCertificateApi(id, tag) {
    return await fetch(`${API_URL_CERTIFICATES}/${id}/tags`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "POST",
        body: JSON.stringify(tag),
    });
}

export async function deleteCertificateApi(id) {
    return await fetch(`${API_URL_CERTIFICATES}/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "DELETE",
    });
}

export async function fetchCertificateByIdApi(id) {
    return await fetch(`${API_URL_CERTIFICATES}/${id}`);
}
