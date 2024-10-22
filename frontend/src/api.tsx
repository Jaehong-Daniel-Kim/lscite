import axios from "axios";
import Cookie from "js-cookie"
import {
    CheckExistenceFunc,
    LoginFunc,
    PinCodeCheckFunc,
    PinCodeGenerateFunc, SignUpFunc,
} from "./types";

const hostname = window?.location?.hostname;
const port = window?.location?.port;

const instance = axios.create({
    baseURL: (
        hostname === "localhost" && port === "3000"
            ? "http://localhost:8080/api/v1"
            : "http://localhost:6307/api/v1"
    ),
    withCredentials: true,  // without this, "Authentication credentials were not provided" will be raised
})

export const getMe = () => {
    return instance.get("users/me")
        .then((response) => response.data)
        .catch((error) => {
            if (error.response) {
                return null
            } else if (error.request) {
                return null
            } else {
            }
        })
}

export const logOut = () => {
    return instance.post(
        "users/logout",
        null,
        {
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            }
        },
    )
        .then((response) => response.data)
}

export const logIn: LoginFunc = (username, password) => {
    return instance.post(
        "users/login",
        {
            username: username,
            password: password,
        },
        {},
    ).then((response) => response.data)
        .catch((error) => {
                return error.response.data
        })
}

export const getMailboxes = () => {
    return instance.get( "postboxes/" ).then((response) => response.data)
}

export const checkExistence: CheckExistenceFunc = (target) => {
    return instance.get("users/check-existence", {params: target})
        .then((response) => response.data)
}

export const generatePinCode: PinCodeGenerateFunc = (email) => {
    return instance.post("users/pin-code-gen", {email: email})
        .then((response) => response.data)
        .catch((error) => {
            return error.response.data
        })
}

export const checkPinCode: PinCodeCheckFunc = (pinCode, email) => {
    return instance.post("users/pin-code-check", {pin_code: pinCode, email: email})
        .then((response) => response.data)
        .catch((error) => {
            return error.response.data
        })
}

export const signUp: SignUpFunc = (signUpFormData) => {
    return instance.post("users/", signUpFormData)
        .then((response) => response.data)
        .catch((error) => {
            return error.reponse.data
        })
}