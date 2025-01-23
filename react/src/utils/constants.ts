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
        CLEAR: "Clear",
        TITLE: "Title",
        SUBMITTER_EMAIL: "Submitter Email",
        ADD: "Add",
        APPLICATIONS: "Applications",
        SAVE: "Save",
        CLOSE: "Close",
        SEARCH: "Search",
        RESET: "Reset",
        RESOURCE: "Resource",
        RESOURCES: "Resources",
        FREE_TEXT: "Free Text",
        NEW_RESOURCE: "New Resource",
        NEW_APPLICATION: "New Application",
        SERVICE: "Service",
        SERVICES: "Services",
        OPEN_EXTERNAL: "Open External",
        NO_SERVICE_FOUND: "No service found.",
        NO_RESOURCE_FOUND: "No resource found.",
        USER: "User",
        GOT_IT: "Got it",
        HOW_RESOURCE_WORK: "How resource form works?",
        ABOUT: "About",
        VISIT_RESOURCE: "Visit Resource",
        USERS: "Users",
        DESCRIPTION: "Description",
        TAGS: "Tags",
        SIGNUP: "Sign Up",
        GO_THERE: "Go there",
        LOGIN: "Login",
        LINK: "Link",
        LEAVE_A_MESSAGE: "Leave a message...",
        YOU_CAN_ONLY_ADD_UP_TO: "You can only add up to",
        YOU_CAN_ADD_UP_TO: "You can add up to",
        SEPARATE_BY_COMMAS: "Enter tags separated by commas",
        MORE_TAGS: "more tags",
        ERROR_FETCHING: "Error fetching items...",
        

        TITLE_SEEN_FIRST: "This will be seen first, try to make it pinpoint direct and easy to understand.",
        EMAIL_RESOURCE: "This is optional and will not be publicly visible! It is only used to notify you if your resource / service gets approved or not.",
        LINK_RESOURCE_DESCRIPTION: "Provide a link to the resource / service, whether it's a Google Drive, Instagram post, official website, or anything that works best for you.",
        DESCRIPTION_RESOURCE: "You can write here whatever you want about the resource.",
        EXAMPLE_RESOURCE_DESCRIPTION: "For example: This is the official site where you can fill the official form for owp",
        RESOURCE_WALKTHROUGH: [
            "This form works in an ",
            "approval step ",
            "Your submitted form will be ",
            "reviewed within 24 hours ",
            "to ensure integrity and safety before being published."
        ],
        
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
    APPLICATION: "/application/:id", 
    ABOUT: '/about',
    LOGIN: '/login',
    SIGNUP: '/signup',
    NEW_RESOURCE: '/resource/new',
    NEW_APPLICATION: '/application/new'
}