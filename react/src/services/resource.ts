import { IResource } from "../utils/types";
import { API } from "./constants";
import { rest } from "./rest";

const STUB = {
    "resources": [
        {
            "submitterEmail": "yvova88@yahoo.com",
            "status": "Approved",
            "link": "www.google.com",
            "description": "This is the official site where you can download and insert the form for you to submit, and again this is just a long text so it can be seen as breaking lines",
            "id": "1e488585-2077-4ebd-82d5-88b9c8049949",
            "tags": "Official,WorkPermit,Site",
            "title": "Permit official form",
            "type": "Resource"
        },
        {
            "submitterEmail": "yvova88@yahoo.com",
            "status": "Approved",
            "link": "www.google.com",
            "description": "I'm teaching English in Calgary. I have an Instagram account where I post daily tips and tricks for learning English. Follow me for more information.",
            "id": "1e488585-2077-4ebd-82d5-88b9c8049941",
            "tags": "English,Teacher,Instagram,Calgary",
            "title": "Jenny Orlov - English Teacher",
            "type": "Resource"
        },
        {
            "submitterEmail": "yvova88@yahoo.com",
            "status": "Approved",
            "link": "link2",
            "description": "description2",
            "id": "1e488585-2077-4ebd-82d5-88b9c8049942",
            "tags": "tag1,tag2",
            "title": "long title long title long title long title title long title title long title",
            "type": "Resource"
        },
        {
            "submitterEmail": "yvova88@yahoo.com",
            "status": "Approved",
            "link": "link3",
            "description": "description3",
            "id": "1e488585-2077-4ebd-82d5-88b9c8049943",
            "tags": "tag1,tag2",
            "title": "title3",
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

export type IResourceData = {
    resources: IResource[];
    services: IResource[];
}

export const getResources = async (): Promise<IResourceData[] | null> => {
    return await rest.get<IResourceData[]>(`${API.RESOURCE}/retrieve`);
};

export const getResources2 = async (): Promise<IResourceData> => {


    // const url = `${API.RESOURCE}/retrieve`;

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(STUB);
        }, 1500);
    });



    // try {
    //     const response = await fetch(url, {
    //         method: 'GET',
    //     });

    //     if (!response.ok) {
    //         throw new Error(`Failed to fetch resources: ${response.status} ${response.statusText}`);
    //     }

    //     const result = await response.json();
    //     return result;
    // } catch (error) {
    //     console.error('Error fetching resources:', error);
    //     toast.error(LANG.EN.ERROR_FETCHING);
    //     return null;
    // }
};