const API_URL_TAGS = "http://localhost:8087/tags";

export async function createTagApi(tag) {
    return await fetch(`${API_URL_TAGS}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "POST",
        body: JSON.stringify(tag),
    });
}
