import { LANG } from "../utils/constants";
import { API } from "./constants";
import { getAuthHeaders, IBody, rest } from "./rest";

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
    status?: number
}

export interface IApplicationResponse {
    application: IApplication | null;
    message?: string;
}

export interface IUpdateResponse {
    application: IApplication | null;
    message?: string;
    status?: number
}

export interface IDeleteResponse {
    message: string;
    status?: number
}

export const getApplications = async (): Promise<IApplication[] | null> => {
    return await rest.get<IApplication[]>(API.APPLICATION);
};


export const getApplication = async (id: string): Promise<IApplicationResponse> => {
    return (
        (await rest.get<IApplicationResponse>(`${API.APPLICATION}/${id}`)) ?? {
            application: null,
            message: LANG.EN.GET_APPLICATION_ERROR,
        }
    );
};



export const createApplication = async (data: IApplication): Promise<ICreateResponse> => {
    const body: IBody = { ...data };
    return (
        (await rest.post<ICreateResponse>(API.APPLICATION, body, getAuthHeaders())) ?? {
            message: LANG.EN.CREATE_APPLICATION_ERROR,
            id: null,
        }
    );
};


export const deleteApplication = async (id: string): Promise<IDeleteResponse> => {
    const response = await rest.delete<IDeleteResponse>(API.APPLICATION, { id }, getAuthHeaders());

    if (!response) {
        return {
            message: LANG.EN.DELETE_APPLICATION_ERROR,
        };
    }

    if (response.status === 401) {
        return {
            message: LANG.EN.NEED_TO_BE_LOGGED_IN,
            status: 401,
        };
    }

    return {
        status: 200,
        message: response.message,
    };
};
export const updateApplication = async (data: IApplication): Promise<IUpdateResponse> => {
    const body: IBody = { ...data };
    const response = await rest.put<IUpdateResponse>(API.APPLICATION, body, getAuthHeaders());

    if (!response) {
        return {
            message: LANG.EN.CREATE_APPLICATION_ERROR,
            application: null,
        };
    }

    if (response.status === 401) {
        return {
            message: LANG.EN.NEED_TO_BE_LOGGED_IN,
            application: null,
            status: 401,
        };
    }

    return response;
};

// export const getApplications = async (): Promise<IApplication[] | null> => {
//     const url = `${API.APPLICATION}`;
//     try {
//         const response = await fetch(url, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });


//         const result: IApplication[] = await response.json();
//         return result;
//     } catch {
//         return null
//     }
// };

// export const getApplication = async (id: string): Promise<IApplicationResponse> => {

//     try {
//         const response = await fetch(`${API.APPLICATION}/${id}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });

//         const result: IApplicationResponse = await response.json();
//         return {
//             application: result.application || null,
//             message: result.message
//         };

//     } catch {
//         return {
//             application: null,
//             message: LANG.EN.GET_APPLICATION_ERROR
//         }
//     }
// }

// export const createApplication = async (data: IApplication): Promise<ICreateResponse> => {
//     const token = localStorage.getItem(TOKEN_KEY);

//     try {
//         const response = await fetch(API.APPLICATION, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`,
//             },
//             body: JSON.stringify({
//                 additional_info: data.additional_info,
//                 application_date: data.application_date,
//                 decision_date: data.decision_date,
//                 is_self_submitted: data.is_self_submitted,
//                 biometric_date: data.biometric_date,
//                 status: data.status,
//                 submission_city: data.submission_city,
//                 username: data.username
//             }),
//         });

//         const result: ICreateResponse = await response.json();
//         return result;
//     } catch {
//         return {
//             message: LANG.EN.CREATE_APPLICATION_ERROR,
//             id: null
//         }
//     }
// }

// export const deleteApplication = async (id: string): Promise<IDeleteResponse> => {
//     const token = localStorage.getItem(TOKEN_KEY);

//     try {
//         const response = await fetch(`${API.APPLICATION}`, {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`,
//             },
//             body: JSON.stringify({
//                 id
//             }),
//         });

//         if (response.status === 401) {
//             return {
//                 message: LANG.EN.NEED_TO_BE_LOGGED_IN,
//                 status: 401
//             }
//         }

//         const result: IDeleteResponse = await response.json();
//         return {
//             status: 200,
//             message: result.message
//         };
//     } catch {
//         return {
//             message: LANG.EN.DELETE_APPLICATION_ERROR
//         }
//     }
// }
// export const updateApplication = async (data: IApplication): Promise<IUpdateResponse> => {
//     const token = localStorage.getItem(TOKEN_KEY);

//     try {
//         const response = await fetch(API.APPLICATION, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`,
//             },
//             body: JSON.stringify({
//                 id: data.id,
//                 additional_info: data.additional_info,
//                 decision_date: data.decision_date,
//                 application_date: data.application_date,
//                 is_self_submitted: data.is_self_submitted,
//                 biometric_date: data.biometric_date,
//                 status: data.status,
//                 submission_city: data.submission_city,
//                 username: data.username
//             }),
//         });
//         if (response.status === 401) {
//             return {
//                 message: LANG.EN.NEED_TO_BE_LOGGED_IN,
//                 application: null,
//                 status: 401
//             }
//         }
//         const result: IUpdateResponse = await response.json();
//         return result;
//     } catch {
//         return {
//             message: LANG.EN.CREATE_APPLICATION_ERROR,
//             application: null
//         }
//     }
// }