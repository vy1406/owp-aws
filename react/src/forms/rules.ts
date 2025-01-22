import { FieldValues, RegisterOptions } from 'react-hook-form';
import { CONSTANTS, LANG } from '../utils/constants';

export type FormValidationRules<T extends FieldValues> = {
    [K in keyof T]?: RegisterOptions<T, any> | undefined;
};

export interface IResourceForm {
    title?: string;
    description?: string;
    link?: string;
    tags?: string;
    submitterEmail?: string;
}

export const ResourceRules: FormValidationRules<IResourceForm> = {
    title: {
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
    description: {
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
    link: {
        required: LANG.EN.LINK_CANNOT_BE_EMPTY,
        minLength: {
            value: 9,
            message: LANG.EN.LINK_TOO_SHORT,
        },
    },
    tags: {
        required: LANG.EN.TAGS_CANNOT_BE_EMPTY,
        validate: (value) =>
            value.split(',').length <= CONSTANTS.MAX_TAGS || LANG.EN.TAGS_MAX_COUNT,
    },
    submitterEmail: {
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: LANG.EN.EMAIL_INVALID,
        }
    }
};