import { TOKEN_KEY } from "./context";

export interface IBody {
    [key: string]: unknown;
}

export interface IHeaders {
    [key: string]: string;
}

export const getAuthHeaders = (): IHeaders => {
    const token = localStorage.getItem(TOKEN_KEY);
    return {
        Authorization: `Bearer ${token}`,
    };
}

export const rest = {
    async request<T>(
        url: string,
        method: string,
        body?: IBody,
        headers?: IHeaders): Promise<T | null> {
        try {

            const defaultHeaders: IHeaders = {
                'Content-Type': 'application/json',
                ...headers
            };

            const response = await fetch(url, {
                method,
                headers: defaultHeaders,
                body: body ? JSON.stringify(body) : undefined,
            });

            return await response.json();
        } catch {
            return null;
        }
    },

    get<T>(url: string, headers?: IHeaders): Promise<T | null> {
        return this.request<T>(url, 'GET', undefined, headers);
    },

    post<T>(url: string, body: IBody, headers?: IHeaders): Promise<T | null> {
        return this.request<T>(url, 'POST', body, headers);
    },

    put<T>(url: string, body: IBody, headers?: IHeaders): Promise<T | null> {
        return this.request<T>(url, 'PUT', body, headers);
    },

    delete<T>(url: string, body?: IBody, headers?: IHeaders): Promise<T | null> {
        return this.request<T>(url, 'DELETE', body, headers);
    }
};
