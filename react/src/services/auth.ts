import { API } from "./constants";


export type ILoginData = {
    username: string;
    password: string;
}

const DUMMY_LOGIN = {
    "username": "admin",
    "password": "Aa1234567!"
}

export type ILoginResponse = {
    message: string;
    token: string;
}
export const apiLogin = async ({ username, password }: ILoginData): Promise<ILoginResponse | null> => {
    const url = `${API.AUTH}/login`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: DUMMY_LOGIN.username,  
                password: DUMMY_LOGIN.password,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result: ILoginResponse = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        return null; 
    }
};
