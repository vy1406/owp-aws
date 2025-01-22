import { FieldValues, RegisterOptions } from 'react-hook-form';

export type FormValidationRules<T extends FieldValues> = {
    [K in keyof T]?: RegisterOptions<T, any> | undefined;
};

export interface ResourceForm {
    Title?: string
    Description?: string
}


export const FormRules: FormValidationRules<ResourceForm> = {
    Title: {
        required: 'Dive site name cannot be empty',
    },
    Description: {
        required: 'Longitude is required',
        min: {
            value: -180,
            message: 'Longitude must be greater than -180',
        },
        max: {
            value: 180,
            message: 'Longitude must be less than 180',
        }
    },
};
