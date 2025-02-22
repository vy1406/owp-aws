import { LANG } from "../utils/constants";
import { API } from "./constants";

export type ILoginData = {
    username: string;
    password: string;
}

export type IAuthResponse = {
    message: string;
    token: string | null;
    username: string | null;
}

export const apiLogin = async ({ username, password }: ILoginData): Promise<IAuthResponse | null> => {
    const url = `${API.AUTH}/login`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        const result: IAuthResponse = await response.json();
        return result;
    } catch  {
        return {
            message: LANG.EN.LOGIN_ERROR,
            token: null,
            username: null
        }
    }
};

export const apiSignUp = async ({ username, password }: ILoginData): Promise<IAuthResponse | null> => {
    const url = `${API.AUTH}/signup`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        const result: IAuthResponse = await response.json();
        return result;
    } catch  {
        return {
            message: LANG.EN.SIGNUP_ERROR,
            token: null,
            username: null
        }
    }
}
