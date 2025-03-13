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
