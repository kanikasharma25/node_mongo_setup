// HTTP Status Codes
const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    CONFLICT: 409,
    SERVER_ERROR: 500,
};

// Common Messages
const MESSAGES = {
    JPG_PNG_ALLOW: "Invalid file type. Only JPEG and PNG allowed.",
    INPUT_VALIDATE_FAIL: "Validation failed",
    INVALID_CREDENTIALS: "Invalid credentials",
    LOGIN_DONE: "Login done",
    SERVER_ERROR: "Something went wrong on server",
    NOT_FOUND: "Not Found",
    PROFILE_LOADED: "Profile loaded",
    ADMIN_API_KEY_MISSING: 'Invalid or missing admin API key',
    APP_API_KEY_MISSING: 'Invalid or missing app API key',
    AUTH_TOKEN_REQUIRED: "Bearer token is required in header authorization key",
    AUTH_TOKEN_INVALID: "Invalid token",
    AUTH_TOKEN_EXPIRED: "Expired token",

};

// Roles
const ROLES = {
    ADMIN: "admin",
    USER: "user",
};


// Export all constants
module.exports = {
    HTTP_STATUS,
    MESSAGES,
    ROLES,
};
