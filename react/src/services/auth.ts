import { LANG } from "../utils/constants";
import { API } from "./constants";
import { rest } from "./rest";

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
    return (await rest.post<IAuthResponse>(`${API.AUTH}/login`, { username, password })) ?? {
        message: LANG.EN.LOGIN_ERROR,
        token: null,
        username: null
    };
};

export const apiSignUp = async ({ username, password }: ILoginData): Promise<IAuthResponse | null> => {
    return (await rest.post<IAuthResponse>(`${API.AUTH}/signup`, { username, password })) ?? {
        message: LANG.EN.SIGNUP_ERROR,
        token: null,
        username: null
    };
}
