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
    LOGIN_DONE: "Login done",
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
