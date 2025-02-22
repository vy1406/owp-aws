import { LANG } from "../utils/constants";
import { API } from "./constants";
import { TOKEN_KEY, USER_KEY } from "./context";

const STUB: IApplication[] = [

    {
        "additional_info": "updated2",
        "application_date": "2024-02-20",
        "is_self_submitted": true,
        "biometric_date": "2024-02-22",
        "status": "Approved",
        "id": "5c5f9527-680c-4894-8cbc-fc3f22be0742",
        "decision_date": "2024-02-23",
        "submission_city": "New Calgaryh",
        "username": "user2"
    },
    {
        "additional_info": "very long text very long text very long text  vvery long text very long text very long textvery long text very long text",
        "application_date": "2024-03-23",
        "is_self_submitted": true,
        "biometric_date": "2024-03-24",
        "status": "Declined",
        "id": "5c5f9527-680c-4894-8cbc-fc3f22be0741",
        "decision_date": "2024-04-24",
        "submission_city": "Halifax",
        "username": "user1"
    },
    {
        "additional_info": "updated3",
        "application_date": "2024-04-24",
        "is_self_submitted": false,
        "biometric_date": "2024-04-25",
        "status": "Pending",
        "id": "5c5f9527-680c-4894-8cbc-fc3f22be0743",
        "decision_date": "2024-05-26",
        "submission_city": "New Toronto",
        "username": "user1"
    },
    {
        "additional_info": "updated3",
        "application_date": "2024-04-24",
        "is_self_submitted": false,
        "biometric_date": null,
        "status": "Pending",
        "id": "5c5f9527-680c-4894-8cbc-fc3f22be0743",
        "decision_date": "2024-05-26",
        "submission_city": "New Toronto",
        "username": "user1"
    },

]

export interface IApplication {
    id?: string;
    additional_info: string;
    application_date: string;
    is_self_submitted: boolean;
    biometric_date: string | null;
    status: string;
    decision_date: string | null;
    submission_city: string | null;
    username?: string | null;
}

export interface ICreateResponse {
    id: string | null;
    message: string;
}

export interface IApplicationResponse {
    application: IApplication | null;
    message?: string;
}

export const getApplications = async (): Promise<IApplication[] | null> => {
    const url = `${API.APPLICATION}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result: IApplication[] = await response.json();
        return result;
    } catch {
        return null
    }
};

export const getApplication = async (id: string): Promise<IApplicationResponse> => {
    const token = localStorage.getItem(TOKEN_KEY);

    try {
        const response = await fetch(`${API.APPLICATION}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        const result: IApplicationResponse = await response.json();
        return {
            application: result.application || null,
            message: result.message
        };

    } catch {
        return {
            application: null,
            message: LANG.EN.GET_APPLICATION_ERROR
        }
    }
}

export const createApplication = async (data: IApplication): Promise<ICreateResponse> => {
    const token = localStorage.getItem(TOKEN_KEY);

    try {
        const response = await fetch(API.APPLICATION, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                additional_info: data.additional_info,
                application_date: data.application_date,
                is_self_submitted: data.is_self_submitted,
                biometric_date: data.biometric_date,
                status: data.status,
                submission_city: data.submission_city,
                username: data.username
            }),
        });

        const result: ICreateResponse = await response.json();
        return result;
    } catch {
        return {
            message: LANG.EN.CREATE_APPLICATION_ERROR,
            id: null
        }
    }
}