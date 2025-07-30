
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

    // otp
    OTP_ON_EMAIL: "Otp has been sent on your email",
    OTP_REQ: "Otp is required",
    OTP_VERIFIED_SUCCESS: "Otp verified successfully",
    OTP_INVALID: "Otp doesn't match",

    // api input
    FIRSTNAME_REQ: "First name is required",
    LASTNAME_REQ: "Last name is required",
    COUNTRYCODE_REQ: "Country code is required",
    PHONE_REQ: "Phone number is required",
    DEVICETOKEN_REQ: "required",

    // user
    USER_CREATE_SUCCESS: "User created successfully",

    // reset password
    RESET_PASSWORD_EMAIL_DELIVERED: 'Reset password link has been sent to your email successfully',
    RESET_TOKEN_REQUIRED: "Reset token is required",
    RESET_PASSWORD_SUCCESS: "Reset password successfully, Now login with new password",
    RESET_TOKEN_EXPIRED: "Reset token has expired. Please request a new one.",

    // profile
    PROFILE_UPDATE_PASS: "Profile updated successfully",
    PROFILE_UPDATE_FAIL: "Profile updation failed",
    PROFILE_LOADED: "Profile loaded",

    // password
    CREATE_PASSWORD: "You need to create a password for this account as it’s a new account.",
    OLD_PASSWORD_REQUIRED: "Required old password",
    NEW_PASSWORD_REQUIRED: "Required new password",
    WRONG_OLD_PASSWORD: "Wrong old password",
    PASSWORD_UPDATED: "Password updated successfully",
    PASSWORD_REQUIRED: "Password is required",

    // email
    EMAIL_REQUIRED: "Email is required",
    EMAIL_INVALID: "Invalid email",
    EMAIL_EXISTS: "Email already exists",

    // image
    JPG_PNG_ALLOW_ONLY: "Invalid file type. Only JPEG and PNG allowed.",

    // validation
    INPUT_VALIDATE_FAIL: "Validation failed",

    // login
    LOGIN_DONE: "Login done",
    LOGOUT_DONE: "Logout done",

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

const GENDER = {

    MALE: "male",
    FEMALE: "female",
    OTHER: "other"

};

const OTP_TYPE = {
    LOGIN: "login",
    RESET_PASS: "reset_pass"
}

// Export all constants
module.exports = {

    HTTP_STATUS,
    MESSAGES,
    ROLES,
    GENDER,
    OTP_TYPE
};
