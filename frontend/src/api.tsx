import axios from "axios";
import Cookie from "js-cookie"
import * as querystring from "querystring";


const instance = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    withCredentials: true,  // without this, "Authentication credentials were not provided" will be raised

})

export const GetMe = () => {
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

export const LogOut = () => {
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

export const LogIn = (username: string, password: string) => {
    return instance.post(
        "users/login",
        {
            username: username,
            password: password,
        },
        {},
    ).then((response) => response)
        .catch((error) => {
                return error.response
        })
}

export const getMailboxes = () => {
    return instance.get( "postboxes/" ).then((response) => response.data)
}