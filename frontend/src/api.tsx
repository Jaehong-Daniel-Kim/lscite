import axios from "axios";
import Cookie from "js-cookie"
import {
    CheckExistenceFunc, GetAllMailBoxFunc,
    LoginFunc, NewMailboxFunc, OccupationFunc,
    PinCodeCheckFunc,
    PinCodeGenerateFunc, RemoveMailboxFunc, SearchPublicUserFunc, SendEmailFunc, SignUpFunc,
} from "./types";
import {QueryFunctionContext} from "@tanstack/react-query";

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

// Get Occupation Selections

export const getOccupationTree: OccupationFunc  = ({queryKey}) => {
    return instance.get("occupations")
        .then((response) => response.data)
        .catch((error) => error.response.data)
}

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

export const getMailboxes: GetAllMailBoxFunc = () => {
    return instance.get( "postboxes/" ).then((response) => response.data)
}

export const sendEmail: SendEmailFunc = (emailForm) => {
    return instance.post(
        "emails/",
        {
            subject: emailForm.subject,
            mail_body: emailForm.mailBody,
            recipients: emailForm.recipients.map((recipient, idx) => (
                {user: recipient.user, recipient_type: recipient.recipientType}
            ))
        },
        {headers: {"X-CSRFToken": Cookie.get("csrftoken") || "",}
        })
        .then((response) => response.data)
        .catch((error) => error.response.data)
}

export const newMailBox: NewMailboxFunc = (name: string) => {
    return instance.post(
        "postboxes/",
        {
            name: name,
            type: "custom",
        },
        {
            headers: {"X-CSRFToken": Cookie.get("csrftoken") || "",}
        })
        .then((response) => response.data)
        .catch((error) => {
            return error.response.data
        })
}

export const searchPublicUser: SearchPublicUserFunc = (category, keyword, page) => {
    return instance.get("users/search",
        {
            headers: {"X-CSRFToken": Cookie.get("csrftoken") || "",},
            params: {category: category, keyword: keyword, page: page},
        })
        .then((response) => response.data)
        .catch((error) => {
            return error.response.data
        })
}

export const removeMailbox: RemoveMailboxFunc = (id: number) => {
    return instance.delete(
        `postboxes/${id}`,
        {
            headers:
                {"X-CSRFToken": Cookie.get("csrftoken") || "",}
        },)
        .then((response) => response.data)
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