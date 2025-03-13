export const rest = {
    async request<T>(
        url: string,
        method: string,
        body?: Record<string, unknown>,
        headers?: Record<string, string>): Promise<T | null> {
        try {

            const defaultHeaders: Record<string, string> = {
                'Content-Type': 'application/json',
                ...headers
            };

            const response = await fetch(url, {
                method,
                headers: defaultHeaders,
                body: body ? JSON.stringify(body) : undefined,
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            return await response.json();
        } catch {
            return null;
        }
    },

    get<T>(url: string, headers?: Record<string, string>): Promise<T | null> {
        return this.request<T>(url, 'GET', undefined, headers);
    },

    post<T>(url: string, body: Record<string, unknown>, headers?: Record<string, string>): Promise<T | null> {
        return this.request<T>(url, 'POST', body, headers);
    },

    put<T>(url: string, body: Record<string, unknown>, headers?: Record<string, string>): Promise<T | null> {
        return this.request<T>(url, 'PUT', body, headers);
    },

    delete<T>(url: string, body?: Record<string, unknown>, headers?: Record<string, string>): Promise<T | null> {
        return this.request<T>(url, 'DELETE', body, headers);
    }
};
