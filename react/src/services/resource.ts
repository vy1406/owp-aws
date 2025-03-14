import { IResource } from "../utils/types";
import { API } from "./constants";
import { rest } from "./rest";


export type IResourceData = {
    resources: IResource[];
    services: IResource[];
}

export const getResources = async (): Promise<IResourceData | null> => {
    return await rest.get<IResourceData>(`${API.RESOURCE}/retrieve`);
};
