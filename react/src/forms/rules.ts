import { FieldValues, RegisterOptions } from 'react-hook-form';
import { LANG } from '../utils/constants';

export type FormValidationRules<T extends FieldValues> = {
    [K in keyof T]?: RegisterOptions<T, any> | undefined;
};

export interface IResourceForm {
    Title?: string;
    Description?: string;
    Link?: string;
    Tags?: string;
}

export const ResourceRules: FormValidationRules<IResourceForm> = {
    Title: {
        required: LANG.EN.TITLE_CANNOT_BE_EMPTY,
        minLength: {
            value: 3,
            message: LANG.EN.TITLE_MIN_LENGTH,
        },
        maxLength: {
            value: 50,
            message: LANG.EN.TITLE_MAX_LENGTH,
        }
    },
    Description: {
        required: LANG.EN.DESCRIPTION_CANNOT_BE_EMPTY,
        minLength: {
            value: 10,
            message: LANG.EN.DESCRIPTION_MIN_LENGTH,
        },
        maxLength: {
            value: 300,
            message: LANG.EN.DESCRIPTION_MAX_LENGTH,
        }
    },
    Link: {
        required: LANG.EN.LINK_CANNOT_BE_EMPTY,
        pattern: {
            value: /^(https?:\/\/[^\s$.?#].[^\s]*)$/i,
            message: LANG.EN.LINK_INVALID_FORMAT,
        },
    },
    Tags: {
        required: LANG.EN.TAGS_CANNOT_BE_EMPTY,
        validate: (value) =>
            value.split(',').length <= 10 || LANG.EN.TAGS_MAX_COUNT,
    },
};