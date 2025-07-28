
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


    // profile
    PROFILE_UPDATE_PASS: "Profile updated successfully",
    PROFILE_UPDATE_FAIL: "Profile updation failed",
    PROFILE_LOADED: "Profile loaded",


    // password
    OLD_PASSWORD_REQUIRED: "Required old password",
    NEW_PASSWORD_REQUIRED: "Required new password",
    WRONG_OLD_PASSWORD: "Wrong old password",
    PASSWORD_UPDATED: "Password updated successfully",


    // image
    JPG_PNG_ALLOW_ONLY: "Invalid file type. Only JPEG and PNG allowed.",


    // validation
    INPUT_VALIDATE_FAIL: "Validation failed",


    // login
    LOGIN_DONE: "Login done",


    // bad request messages
    INVALID_CREDENTIALS: "Invalid credentials",
    SERVER_ERROR: "Something went wrong on server",
    NOT_FOUND: "Not Found",
    ADMIN_API_KEY_MISSING: 'Invalid or missing admin API key',
    APP_API_KEY_MISSING: 'Invalid or missing app API key',


    // auth token
    AUTH_TOKEN_REQUIRED: "Bearer token is required in header authorization key",
    AUTH_TOKEN_INVALID: "Invalid token",
    AUTH_TOKEN_EXPIRED: "Expired token",


};

// Roles
const ROLES = {
    ADMIN: "admin",
    SALES_REP: "sales rep",
};

// Export all constants
module.exports = {
    HTTP_STATUS,
    MESSAGES,
    ROLES,
};
