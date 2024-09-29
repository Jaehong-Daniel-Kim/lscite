import axios from "axios";
import Cookie from "js-cookie"
import * as querystring from "querystring";
import {QueryFunctionContext, QueryKey} from "@tanstack/react-query";


const instance = axios.create({
    baseURL: "http://localhost:8080/api/v1",
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

export const logIn = (username: string, password: string) => {
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

export const getExistenceOfUser = (username: string) => {
    return instance.get(`users/exists/${username}`)
        .then((response) => response.data)
}