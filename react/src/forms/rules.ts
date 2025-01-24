import { FieldValues, RegisterOptions } from 'react-hook-form';
import { CONSTANTS, LANG, STATUS_MAP } from '../utils/constants';

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

export interface IApplicationForm {
    application_date?: string;
    biometric_date: string | null;
    decision_date: string | null;
    additional_info: string;
    is_self_submitted: boolean;
    status: string;
    submission_city: string | null;
}

export const ApplicationRules: FormValidationRules<IApplicationForm> = {
    application_date: {
        required: LANG.EN.APPLICATION_DATE_REQUIRED,
    },
    biometric_date: {
        validate: (value, formValues) => {
            if (!value || !formValues.application_date) {
                return true;  
            }
            
            const applicationDate = new Date(formValues.application_date);
            const biometricDate = new Date(value);
    
            if (biometricDate.getTime() <= applicationDate.getTime()) {
                return LANG.EN.BIOMETRIC_DATE_MUST_BE_LATER;
            }
    
            if (formValues?.decision_date) {
                const decisionDate = new Date(formValues.decision_date);
    
                if (biometricDate.getTime() >= decisionDate.getTime()) {
                    return LANG.EN.BIOMETRIC_DATE_MUST_BE_BEFORE_DECISION;
                }
            }
    
            return true;
        },
    },
    
    
    decision_date: {
        validate: (value, formValues) => {
            if (STATUS_MAP.PENDING === formValues?.status && value) {
                return LANG.EN.DECISION_DATE_CANT_BE_WITH_STATUS_PENDING;
            }
            
            if (formValues?.status && formValues.status !== STATUS_MAP.PENDING && !value) {
                return LANG.EN.DECISION_DATE_REQUIRED;
            }
    
            if (value && formValues.application_date) {
                const applicationDate = new Date(formValues.application_date);
                const decisionDate = new Date(value);
                if (decisionDate.getTime() <= applicationDate.getTime()) {
                    return LANG.EN.DECISION_DATE_MUST_BE_LATER;
                }
            }

            return true;
        },
    },
    
};

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