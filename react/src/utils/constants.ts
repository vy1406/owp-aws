export const CONSTANTS = {
    MAX_TAGS: 10
}

export const RESOURCE_MAP = {
    SERVICE: "Service",
    RESOURCE: "Resource",
}


export const STATUS_MAP = {
    APPROVED: 'Approved',
    PENDING: 'Pending',
    DECLINED: 'Declined',
}

export const REGEX = {
    ONLY_ENGLISH: /^[A-Za-z\s]+$/,
    EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    LETTER_NUMBERS_SPECIAL_CHARS: /^[A-Za-z0-9!@#$%^&*()_+=[\]{}|\\;:'",.<>?/`~-]*$/
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
        HOW_IT_WORKS_TITLE: "How it works ?",
        WHAT_IS_IT: "What is it about?",
        ADD: "Add",
        APPLICATIONS: "Applications",
        SAVE: "Save",
        CLOSE: "Close",
        SEARCH: "Search",
        RESET: "Reset",
        RESOURCE: "Resource",
        RESOURCES: "Resources",
        LOGIN_ERROR: "Failed to log in",
        SIGNUP_ERROR: "Failed to sign up",
        FILTER_AND_SEARCH: "Filter & Search",
        STATISTICS: "Statistics",
        DATE_FROM: "Date From",
        DATE_TO: "Date To",
        FREE_TEXT: "Free Text",
        NEW_RESOURCE: "New Resource",
        NEW_APPLICATION: "New Application",
        SERVICE: "Service",
        CREATE_APPLICATION: "Create Application",
        BIOMETRIC_DATE_MUST_BE_LATER: "Biometric date must be later than application date.",
        DECISION_DATE_MUST_BE_LATER: "Decision date must be later than application date.",
        BIOMETRIC_DATE_CANNOT_BE_BEFORE_DECISION: "Biometric date cannot be before decision date.",
        DECISION_DATE_MUST_BE_AFTER_BIOMETRIC_DATE: "Decision date must be after biometric date.",
        BIOMETRIC_DATE_MUST_BE_BEFORE_DECISION: "Biometric date must be before decision date.",
        SERVICES: "Services",
        OPEN_EXTERNAL: "Open External",
        NO_SERVICE_FOUND: "No service found.",
        NO_RESOURCE_FOUND: "No resource found.",
        NO_APPLICATION_FOUND: "No application found.",
        USER: "User",
        USERNAME: "Username",
        PASSWORD: "Password",
        RE_PASSWORD: "Re-enter Password",
        GOT_IT: "Got it",
        HOW_RESOURCE_WORK: "How resource form works?",
        ABOUT: "About",
        VISIT_RESOURCE: "Visit Resource",
        USERS: "Users",
        DESCRIPTION: "Description",
        TAGS: "Tags",
        STATUS: "Status",
        GO_THERE: "Go there",
        LOGIN: "Login",
        LOGOUT: "Logout",
        SIGN_UP: "Sign Up",
        SELECT_STATUS: "Select Status",
        STATUS_APPROVED: "Approved",
        STATUS_DECLINED: "Declined",
        STATUS_PENDING: "Pending",
        LINK: "Link",
        LEAVE_A_MESSAGE: "Leave a message...",
        YOU_CAN_ONLY_ADD_UP_TO: "You can only add up to",
        YOU_CAN_ADD_UP_TO: "You can add up to",
        SEPARATE_BY_COMMAS: "Enter tags separated by commas",
        DECISION_DATE_REQUIRED: "Decision date is required",
        DECISION_DATE_CANT_BE_WITH_STATUS_PENDING: "Decision date can't be with status pending",
        MORE_TAGS: "more tags",
        FROM_APPLY_TO_DECISION: "From apply to decision",
        ERROR_FETCHING: "Error fetching items...",
        APPLICATION_DATE: "Application Date",
        APPLICATION_CREATED_SUCCESS: "Application created successfully",
        CREATE_APPLICATION_ERROR: "Error creating application",
        GET_APPLICATION_ERROR: "Error getting application",
        WAITING_SINCE_APPLICATION: "Waiting since application",
        WAITING_SINCE_BIOMETRIC: "Waiting since biometric",
        DECISION_DATE: "Decision Date",
        BIOMETRIC_DATE: "Biometric Date",
        SUBMISSION_CITY: "Submission City",
        SELF_SUBMISSION: "Self Submission",
        ADDITIONAL_INFO: "Additional Info",
        APPLICATION_DATE_REQUIRED: "Application date is required",
        SUBMISSION_CITY_REQUIRED: "Submission city is required",
        SUBMISSION_CITY_MUST_BE_ENGLISH: "Submission city must be in English",
        YES: "Yes",
        NO: "No",
        GO_TO_APPLICATION: "Go to application",
        PASSWORD_REQUIRED: "Password is required",
        USERNAME_REQUIRED: "Username is required",
        PASSWORDS_MUST_MATCH: "Passwords must match",
        USERNAME_MUST_BE_VALID: "Can only contain letters, numbers, and special characters.",
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
        HOW_TO_SIGN_UP_UNIQUE_USERNAME: "Make sure to sign up with a unique username. You username will be seen to others as part of submitted application form.",
        HOW_TO_SIGN_UP_PASSWORD: "All password are stored in a secured way, NOT a single password stored as plain text. 'Forgot password' will be added lately.",
        FEATURES_TITLE: "Features",

        INTRO: "I created this application out of boredom while waiting for my decision. I got tired of asking people where they stand so I can compare myself to them, so I've created somethign more or less automatic",
        HOW_IT_WORKS: [
            "You can log in with a made-up username and a simple password. Just make sure to remember these credentials, as you will need them to update your applications and their statuses. We do not store any personal information, so your privacy is guaranteed.",
            "To get started, simply sign up with a username and password. Once logged in, you can start adding your applications and tracking their statuses.",
        ],
        FEATURES: [
            "Add as many applications as you want.",
            "Edit & delete your applications at any time.",
            "Filter and sort",
            "Share links to your applications",
            "You can add resources, any valuable resource is welcome. For example, links to useful sites like comparing the cost of living.",
            "You can also add services, for example, if you are an English teacher or a real estate agent, you can share a link to your page with an explanation.",
        ],
        PURPOSE_TITLE: "Purpose",
        DISCLAIMERS: "disclaimers",
        PURPOSE: [
            "This site is not for commercial use. It is designed purely for monitoring and statistical purposes. By using this site, you can gain insights into the application process and better manage your expectations.",
            "This application is provided 'as is' without any representations or warranties, express or implied. The creator of this application will not be held liable for any damages arising from the use of this application. Users are responsible for the accuracy of the data they input and for complying with any relevant legal requirements. This site is intended for personal use only, and any misuse of the site or its data is strictly prohibited."
        ],
        FUNNY_NOTE: "Like anyone cares lol",
        ABOUT_ME_TITLE: "About me",
        ABOUT_ME: {
            NAME: "Made by Vladimir Elisavetsky",
            EMAIL: "vladimir.elisavetsky@gmail.com"
        }
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