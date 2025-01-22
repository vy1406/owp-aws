import { toast } from "react-toastify";
import { API } from "./constants";
import { LANG } from "../utils/constants";

const STUB = {
    "resources": [
        {
            "submitterEmail": "yvova88@yahoo.com",
            "status": "Approved",
            "link": "my link lol",
            "description": "my description",
            "id": "1e488585-2077-4ebd-82d5-88b9c8049949",
            "tags": "tag1,tag2",
            "title": "from postman",
            "type": "Resource"
        }
    ],
    "services": [
        {
            "status": "Approved",
            "link": "http://www.google.com",
            "description": "asdas",
            "id": "1f7c9b0c-d40b-41af-b1b2-6909be22f2ef",
            "tags": "a1",
            "title": "service client",
            "type": "Service"
        }
    ]
}
export const getResources = async () => {
    const url = `${API.RESOURCE}/retrieve`;

    return STUB;
    try {
        const response = await fetch(url, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch resources: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching resources:', error);
        toast.error(LANG.EN.ERROR_FETCHING);
        return null;
    }
};