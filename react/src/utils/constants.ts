export const CONSTANTS = {
    MAX_TAGS: 10
}

export const RESOURCE_MAP = {
    SERVICE: "Service",
    RESOURCE: "Resource",
}

export const LANG = {
    EN: {
        SUBMIT: "Submit",
        CANCEL: "Cancel",
        DELETE: "Delete",
        EDIT: "Edit",
        EMAIL: "Email",
        SUBMITTER_EMAIL: "Submitter Email",
        ADD: "Add",
        APPLICATIONS: "Applications",
        SAVE: "Save",
        CLOSE: "Close",
        SEARCH: "Search",
        RESET: "Reset",
        RESOURCE: "Resource",
        RESOURCES: "Resources",
        NEW_RESOURCE: "New Resource",
        NEW_APPLICATION: "New Application",
        SERVICE: "Service",
        SERVICES: "Services",
        USER: "User",
        ABOUT: "About",
        USERS: "Users",
        DESCRIPTION: "Description",
        TAGS: "Tags",
        SIGNUP: "Sign Up",
        LOGIN: "Login",
        LINK: "Link",
        LEAVE_A_MESSAGE: "Leave a message...",
        YOU_CAN_ONLY_ADD_UP_TO: "You can only add up to",
        YOU_CAN_ADD_UP_TO: "You can add up to",
        MORE_TAGS: "more tags",



        TITLE_CANNOT_BE_EMPTY: "Title cannot be empty.",
        TITLE_MIN_LENGTH: "Title must be at least 3 characters long.",
        TITLE_MAX_LENGTH: "Title cannot exceed 50 characters.",
        
        DESCRIPTION_CANNOT_BE_EMPTY: "Description cannot be empty.",
        DESCRIPTION_MIN_LENGTH: "Description must be at least 10 characters long.",
        DESCRIPTION_MAX_LENGTH: "Description cannot exceed 300 characters.",
        
        LINK_CANNOT_BE_EMPTY: "Link cannot be empty.",
        LINK_TOO_SHORT: "Link is too short",

        TAGS_CANNOT_BE_EMPTY: "Tags cannot be empty.",
        TAGS_MAX_COUNT: `You can only add up to ${CONSTANTS.MAX_TAGS} tags.`,

        EMAIL_INVALID: "Invalid email address.",

        EMAIL_NOTIFIED: "Email will be notified when the resource is approved / decline.",
    }
};


export const ROUTES = {
    HOME: '/',
    RESOURCES: '/resources',
    APPLICATIONS: '/applications',
    ABOUT: '/about',
    LOGIN: '/login',
    SIGNUP: '/signup',
    NEW_RESOURCE: '/resource/new',
    NEW_APPLICATION: '/application/new'
}